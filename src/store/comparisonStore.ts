import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TComparisonItem, TComparisonStore, TComparisonTab } from '../types/comparison'

export const normalizeCategoryKey = (categoryName?: string, tab: TComparisonTab = 'equipment'): string => {
	if (!categoryName) return tab === 'equipment' ? 'cnc-routers' : 'accessories'
	const lower = categoryName.toLowerCase()
	if (lower.includes('router') || lower.includes('cnc')) return 'cnc-routers'
	if (lower.includes('marker')) return 'laser-markers'
	if (lower.includes('metal') || lower.includes('cutter')) return 'metal-cutters'
	if (lower.includes('weld')) return 'laser-welding'
	if (lower.includes('clean')) return 'laser-cleaning'
	if (lower.includes('pipe')) return 'laser-pipe-cutting'
	if (lower.includes('press') || lower.includes('hydraulic')) return 'hydraulic-press-brakes'
	if (lower.includes('laser')) return 'laser-machines'
	if (lower.includes('accessor')) return 'accessories'
	return lower.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'general'
}

export const getItemKey = (referenceId: number | string, itemtype: number = 2): string => {
	return `${referenceId}_${itemtype}`
}

const DEFAULT_SLOTS: Record<string, (TComparisonItem | null)[]> = {
	'laser-machines': [null, null, null, null],
	'cnc-routers': [null, null, null, null],
	'laser-markers': [null, null, null, null],
	'metal-cutters': [null, null, null, null],
	'laser-welding': [null, null, null, null],
	'laser-cleaning': [null, null, null, null],
	'laser-pipe-cutting': [null, null, null, null],
	'hydraulic-press-brakes': [null, null, null, null],
	'accessories': [null, null, null, null]
}

export const useComparisonStore = create<TComparisonStore>()(
	persist(
		(set, get) => ({
			activeTab: 'equipment',
			selectedCategory: 'cnc-routers',
			slotsByCategory: DEFAULT_SLOTS,
			showDifferencesOnly: false,

			setActiveTab: (tab: TComparisonTab) => {
				const defaultCat = tab === 'equipment' ? 'cnc-routers' : 'accessories'
				set({ activeTab: tab, selectedCategory: defaultCat })
			},

			setSelectedCategory: (category: string) => set({ selectedCategory: category }),

			setShowDifferencesOnly: (show: boolean) => set({ showDifferencesOnly: show }),

			addToCompare: (item: TComparisonItem, categoryKey?: string, slotIndex?: number) => {
				const state = get()
				const refId = Number(item.referenceId)
				const itype = item.itemtype || 2
				const targetTab: TComparisonTab = itype === 3 ? 'accessories' : (item.categoryTab || (item.categoryName?.toLowerCase().includes('accessor') ? 'accessories' : 'equipment'))
				const targetCat = categoryKey || normalizeCategoryKey(item.categoryName, targetTab)

				const currentSlots = state.slotsByCategory[targetCat] || [null, null, null, null]
				const clonedSlots = [...currentSlots]

				// If already in this category, don't duplicate
				const existingIndex = clonedSlots.findIndex(
					s => s && Number(s.referenceId) === refId && (s.itemtype || 2) === itype
				)
				if (existingIndex !== -1) {
					return
				}

				if (typeof slotIndex === 'number' && slotIndex >= 0 && slotIndex < 4) {
					clonedSlots[slotIndex] = item
				} else {
					// Find first empty slot
					const emptyIndex = clonedSlots.findIndex(s => s === null)
					if (emptyIndex !== -1) {
						clonedSlots[emptyIndex] = item
					} else {
						// Overwrite the last slot (slot 3)
						clonedSlots[3] = item
					}
				}

				set({
					slotsByCategory: {
						...state.slotsByCategory,
						[targetCat]: clonedSlots
					},
					activeTab: targetTab,
					selectedCategory: targetCat
				})
			},

			removeFromCompare: (referenceId: number | string, itemtype: number = 2) => {
				const state = get()
				const refId = Number(referenceId)
				const itype = itemtype || 2
				const newSlotsByCategory = { ...state.slotsByCategory }

				for (const cat of Object.keys(newSlotsByCategory)) {
					const slots = newSlotsByCategory[cat] || []
					newSlotsByCategory[cat] = slots.map(s => {
						if (s && Number(s.referenceId) === refId && (s.itemtype || 2) === itype) {
							return null
						}
						return s
					})
				}

				set({ slotsByCategory: newSlotsByCategory })
			},

			setSlotItem: (categoryKey: string, slotIndex: number, item: TComparisonItem | null) => {
				const state = get()
				const currentSlots = state.slotsByCategory[categoryKey] || [null, null, null, null]
				const clonedSlots = [...currentSlots]
				clonedSlots[slotIndex] = item

				set({
					slotsByCategory: {
						...state.slotsByCategory,
						[categoryKey]: clonedSlots
					}
				})
			},

			clearCategory: (categoryKey: string) => {
				const state = get()
				set({
					slotsByCategory: {
						...state.slotsByCategory,
						[categoryKey]: [null, null, null, null]
					}
				})
			},

			toggleCompare: (item: TComparisonItem, categoryKey?: string) => {
				const state = get()
				const isComp = state.isCompared(item.referenceId, item.itemtype)
				if (isComp) {
					state.removeFromCompare(item.referenceId, item.itemtype)
				} else {
					state.addToCompare(item, categoryKey)
				}
			},

			isCompared: (referenceId: number | string, itemtype: number = 2) => {
				const state = get()
				const refId = Number(referenceId)
				const itype = itemtype || 2

				for (const cat of Object.keys(state.slotsByCategory)) {
					const slots = state.slotsByCategory[cat] || []
					if (slots.some(s => s && Number(s.referenceId) === refId && (s.itemtype || 2) === itype)) {
						return true
					}
				}
				return false
			},

			getTotalCount: () => {
				const state = get()
				let count = 0
				const seenKeys = new Set<string>()

				for (const cat of Object.keys(state.slotsByCategory)) {
					const slots = state.slotsByCategory[cat] || []
					for (const s of slots) {
						if (s) {
							const key = getItemKey(s.referenceId, s.itemtype)
							if (!seenKeys.has(key)) {
								seenKeys.add(key)
								count++
							}
						}
					}
				}
				return count
			},

			getTabCount: (tab: TComparisonTab) => {
				const state = get()
				let count = 0
				const seenKeys = new Set<string>()

				for (const cat of Object.keys(state.slotsByCategory)) {
					const isAccessoryCat = cat === 'accessories' || cat.includes('accessory')
					if ((tab === 'accessories' && isAccessoryCat) || (tab === 'equipment' && !isAccessoryCat)) {
						const slots = state.slotsByCategory[cat] || []
						for (const s of slots) {
							if (s) {
								const key = getItemKey(s.referenceId, s.itemtype)
								if (!seenKeys.has(key)) {
									seenKeys.add(key)
									count++
								}
							}
						}
					}
				}
				return count
			},

			getCategoryCount: (categoryKey: string) => {
				const state = get()
				const slots = state.slotsByCategory[categoryKey] || []
				return slots.filter(Boolean).length
			}
		}),
		{
			name: 'wattsan_comparison_store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

// Legacy alias compatibility
export const comparisonStore = useComparisonStore
export const selectEquipmentByType = (type: string) => (state: TComparisonStore) => ({
	equipments: (state.slotsByCategory[type] || [null, null, null, null]).map(s => s?.id || null),
	changeEquipments: (id: string, index: number, cat: string) => {}
})
