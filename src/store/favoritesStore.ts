import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
	API_GET_FAVORITES,
	API_CREATE_FAVORITE,
	API_DELETE_FAVORITE
} from '@constants/api'
import { authStore } from '@store/auth'
import { authorizedRequest } from '@/utils/request'
import { getAllProducts, getSeries, getSellableCharacteristics, getFullCharacteristics, getClientConfigurations } from '@/api/product'

export interface TFavoriteItem {
	id: string | number
	favoriteRecordId?: number
	referenceId: number
	itemtype: 1 | 2 | 3 // 1 = Configurator, 2 = Product, 3 = Direct Characteristic
	name: string
	code?: string
	categoryName?: string
	categoryId?: string | number
	price: number | string
	oldPrice?: number | string
	image: string
	available: boolean
	unit?: string
}

export interface TFavoritesStore {
	items: TFavoriteItem[]
	deletedKeys: string[]
	isLoading: boolean
	fetchFavorites: (force?: boolean) => Promise<void>
	addFavorite: (item: TFavoriteItem) => Promise<void>
	removeFavorite: (referenceId: number | string, itemtype?: 1 | 2 | 3) => Promise<void>
	toggleFavorite: (item: TFavoriteItem) => Promise<void>
	isFavorite: (referenceId: number | string, itemtype?: 1 | 2 | 3) => boolean
	clearFavorites: () => void
}

let activeFetchPromise: Promise<void> | null = null

const getItemKey = (referenceId: number | string, itemtype?: 1 | 2 | 3) =>
	`${referenceId}_${itemtype ?? 2}`

export const useFavoritesStore = create<TFavoritesStore>()(
	persist(
		(set, get) => ({
			items: [],
			deletedKeys: [],
			isLoading: false,

			fetchFavorites: async (force = false) => {
				const authorized = authStore.get.authorized()
				const token = authStore.get.token()
				const clientId = authStore.get.clientId()

				if (!authorized || !token || !clientId) {
					return
				}

				if (!force && activeFetchPromise) {
					return activeFetchPromise
				}

				activeFetchPromise = (async () => {
					try {
						set({ isLoading: true })
						const response = await authorizedRequest({
							url: API_GET_FAVORITES,
							method: 'GET',
							query: {
								filter: `clientId~eq~'${clientId}'`,
								pageSize: 500
							}
						})

						if (!response || response instanceof Error || !response.data) {
							set({ isLoading: false })
							return
						}

						const rawFavorites = response.data || []
						const deletedKeys = get().deletedKeys || []

						// Filter out items that the user has explicitly deleted locally
						const validRawFavorites = rawFavorites.filter((f: any) => {
							const key = getItemKey(f.referenceId, f.itemtype)
							return !deletedKeys.includes(key)
						})

						const hasProductItems = validRawFavorites.some((f: any) => f.itemtype === 2)
						const hasCharItems = validRawFavorites.some((f: any) => f.itemtype === 3)
						const hasConfigItems = validRawFavorites.some((f: any) => f.itemtype === 1)

						const [allProds, allSeries, allChars, allConfigs] = await Promise.all([
							hasProductItems ? getAllProducts() : Promise.resolve([]),
							hasProductItems ? getSeries() : Promise.resolve([]),
							hasCharItems ? getSellableCharacteristics() : Promise.resolve([]),
							hasConfigItems ? getClientConfigurations() : Promise.resolve([])
						])

						const prodsMap = new Map((allProds || []).map((p: any) => [Number(p.id), p]))
						const seriesMap = new Map((allSeries || []).map((s: any) => [Number(s.id), s]))
						const charsMap = new Map((allChars || []).map((c: any) => [Number(c.id), c]))
						const configsMap = new Map((allConfigs || []).map((c: any) => [Number(c.id), c]))

						// Deduplicate by referenceId + itemtype
						const seenKeys = new Set<string>()
						const enrichedFavorites: TFavoriteItem[] = []

						for (const fav of validRawFavorites) {
							const itemtype = (fav.itemtype as 1 | 2 | 3) || 2
							const refId = Number(fav.referenceId)
							const key = getItemKey(refId, itemtype)

							if (seenKeys.has(key)) continue
							seenKeys.add(key)

							if (itemtype === 2) {
								const prod: any = prodsMap.get(refId)
								const seriesId = prod?.seriesId || fav.referenceObject?.seriesId
								const seriesObj: any = seriesId ? seriesMap.get(Number(seriesId)) : null
								const basePrice = (prod?.price && Number(prod.price) > 0)
									? Number(prod.price)
									: (prod?.orderPrice && Number(prod.orderPrice) > 0)
										? Number(prod.orderPrice)
										: (seriesObj?.startPrice && Number(seriesObj.startPrice) > 0)
											? Number(seriesObj.startPrice)
											: (Number(fav.referenceObject?.price) > 0 ? Number(fav.referenceObject.price) : 1000)

								const charsSum = (prod?.fullProductCharacteristics || [])
									.filter((x: any) => x.isActive && Number(x.price) > 0)
									.reduce((sum: number, pc: any) => sum + Number(pc.price), 0)

								const finalPrice = basePrice + charsSum
								const imgUrl = prod?.attachments?.[0]?.fileManager?.url ||
									fav.referenceObject?.attachments?.[0]?.fileManager?.url ||
									fav.referenceObject?.fileManger?.url ||
									'/img/catalog/cnc-routes.png'

								enrichedFavorites.push({
									id: `fav-${fav.id}`,
									favoriteRecordId: fav.id,
									referenceId: refId,
									itemtype: 2,
									name: prod?.name || fav.referenceObject?.name || 'Product',
									categoryName: seriesObj?.name || 'CNC Routers',
									price: `$${finalPrice.toLocaleString()}`,
									image: imgUrl,
									available: prod ? prod.isActive !== false : true
								})
							} else if (itemtype === 3) {
								const charObj: any = charsMap.get(refId)
								const charPrice = (charObj?.price && Number(charObj.price) > 0)
									? Number(charObj.price)
									: (Number(fav.referenceObject?.price) > 0
										? Number(fav.referenceObject.price)
										: 1000)

								const charImg = charObj?.fileManager?.url ||
									charObj?.fileManger?.url ||
									fav.referenceObject?.fileManger?.url ||
									'/img/catalog/cnc-routes.png'

								enrichedFavorites.push({
									id: `fav-${fav.id}`,
									favoriteRecordId: fav.id,
									referenceId: refId,
									itemtype: 3,
									name: charObj?.name ? `${charObj.name} ${charObj.unit || ''}`.trim() : (fav.referenceObject?.name || 'Characteristic'),
									categoryName: 'Accessories for CNC Router Machines',
									price: `$${charPrice.toLocaleString()}`,
									image: charImg,
									available: charObj ? charObj.isActive !== false : true,
									unit: charObj?.unit
								})
							} else {
								// Type 1: Configurator
								const configObj: any = configsMap.get(refId)
								const seriesName = configObj?.series?.name || configObj?.configurationName?.trim() || fav.referenceObject?.configurationName || 'Wattsan Configurator'
								const modelName = configObj?.modelName ? `${configObj.modelName}` : ''
								const configTitle = `${seriesName} ${modelName}`.trim()
								const configPrice = (configObj?.price && Number(configObj.price) > 0)
									? Number(configObj.price)
									: (Number(fav.referenceObject?.price) > 0 ? Number(fav.referenceObject.price) : 5000)
								const configImg = configObj?.fileManger?.url || configObj?.fileManger?.thumbnail || fav.referenceObject?.fileManger?.url || '/img/catalog/cnc-routes.png'

								enrichedFavorites.push({
									id: `fav-${fav.id}`,
									favoriteRecordId: fav.id,
									referenceId: refId,
									itemtype: 1,
									name: configTitle || 'Custom Configuration',
									categoryName: configObj?.series?.name ? `${configObj.series.name} Series` : 'Configurator Build',
									price: `$${configPrice.toLocaleString()}`,
									image: configImg,
									available: true
								})
							}
						}

						set({ items: enrichedFavorites, isLoading: false })
					} catch (error) {
						console.error('Failed to fetch favorites from API', error)
						set({ isLoading: false })
					} finally {
						activeFetchPromise = null
					}
				})()

				return activeFetchPromise
			},

			addFavorite: async (item: TFavoriteItem) => {
				const currentItems = get().items
				const itemKey = getItemKey(item.referenceId, item.itemtype)
				const deletedKeys = get().deletedKeys || []

				// Unmark as deleted if it was previously deleted
				const updatedDeletedKeys = deletedKeys.filter(k => k !== itemKey)

				const exists = currentItems.some(
					i =>
						Number(i.referenceId) === Number(item.referenceId) &&
						(i.itemtype ?? 2) === (item.itemtype ?? 2)
				)

				set({
					items: exists ? currentItems : [item, ...currentItems],
					deletedKeys: updatedDeletedKeys
				})

				try {
					const authorized = authStore.get.authorized()
					const token = authStore.get.token()
					const clientId = authStore.get.clientId()

					if (authorized && token && clientId) {
						const response = await authorizedRequest({
							url: API_CREATE_FAVORITE,
							method: 'POST',
							data: {
								referenceId: Number(item.referenceId),
								itemtype: item.itemtype || 2,
								clientId
							}
						})
						if (response?.data?.[0]?.id) {
							const favRecordId = response.data[0].id
							set(state => ({
								items: state.items.map(i =>
									Number(i.referenceId) === Number(item.referenceId) &&
									(i.itemtype ?? 2) === (item.itemtype ?? 2)
										? { ...i, favoriteRecordId: favRecordId }
										: i
								)
							}))
						}
					}
				} catch (error) {
					console.error('Failed to create favorite on API', error)
				}
			},

			removeFavorite: async (referenceId: number | string, itemtype?: 1 | 2 | 3) => {
				const currentItems = get().items
				const itemKey = getItemKey(referenceId, itemtype)
				const deletedKeys = get().deletedKeys || []
				const targetItem = currentItems.find(i => {
					if (itemtype !== undefined) {
						return (
							Number(i.referenceId) === Number(referenceId) &&
							(i.itemtype ?? 2) === itemtype
						)
					}
					return Number(i.referenceId) === Number(referenceId)
				})

				// Immediately remove from local state and remember in deletedKeys
				set({
					items: currentItems.filter(i => {
						if (itemtype !== undefined) {
							return !(
								Number(i.referenceId) === Number(referenceId) &&
								(i.itemtype ?? 2) === itemtype
							)
						}
						return Number(i.referenceId) !== Number(referenceId)
					}),
					deletedKeys: deletedKeys.includes(itemKey) ? deletedKeys : [...deletedKeys, itemKey]
				})

				try {
					const authorized = authStore.get.authorized()
					const token = authStore.get.token()
					const clientId = authStore.get.clientId()

					if (authorized && token && clientId && targetItem?.favoriteRecordId) {
						await authorizedRequest({
							url: API_DELETE_FAVORITE,
							method: 'POST',
							data: {
								id: targetItem.favoriteRecordId,
								referenceId: Number(referenceId),
								itemtype: itemtype || targetItem.itemtype || 2,
								clientId
							}
						})
					}
				} catch (error) {
					console.error('Failed to delete favorite on API', error)
				}
			},

			toggleFavorite: async (item: TFavoriteItem) => {
				const { items, addFavorite, removeFavorite } = get()
				const exists = items.some(
					i =>
						Number(i.referenceId) === Number(item.referenceId) &&
						(i.itemtype ?? 2) === (item.itemtype ?? 2)
				)
				if (exists) {
					await removeFavorite(item.referenceId, item.itemtype)
				} else {
					await addFavorite(item)
				}
			},

			isFavorite: (referenceId: number | string, itemtype?: 1 | 2 | 3) => {
				return get().items.some(i => {
					if (itemtype !== undefined) {
						return (
							Number(i.referenceId) === Number(referenceId) &&
							(i.itemtype ?? 2) === itemtype
						)
					}
					return Number(i.referenceId) === Number(referenceId)
				})
			},

			clearFavorites: () => set({ items: [], deletedKeys: [] })
		}),
		{
			name: 'wattsan_favorites',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useFavoritesStore
