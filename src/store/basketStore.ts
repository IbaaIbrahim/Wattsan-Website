import { create } from 'zustand'

import { TBasketStore } from '../types/basket'

export const basketStore = create<TBasketStore>(set => ({
	isLogged: false,
	changeLogged: logged => set(() => ({ isLogged: logged })),
	items: [],
	saveItems: items =>
		set(() => {
			const selected = items
				.filter(({ selected }) => selected)
				.map(({ id }) => id)

			return { items, selected }
		}),
	changeSelected: (id: string) =>
		set(state => {
			return {
				items: state.items.map(item => {
					if (item.id === id) {
						return {
							...item,
							selected: !item.selected
						}
					}

					return item
				})
			}
		}),
	changeQuantity: (id, quantity) =>
		set(state => {
			return {
				items: state.items.map(item => {
					if (item.id === id) {
						return {
							...item,
							quantity
						}
					}

					return item
				})
			}
		}),
	changeAllSelect: () =>
		set(state => {
			const someUnSelected = state.items.some(({ selected }) => !selected)

			return {
				items: state.items.map(item => ({ ...item, selected: someUnSelected }))
			}
		}),
	checkoutInfo: {
		countries: [],
		deliveryMethods: []
	},
	saveCheckoutInfo: checkoutInfo => set(() => ({ checkoutInfo })),
	deliveryMethod: '',
	changeDeliveryMethod: deliveryMethod => set(() => ({ deliveryMethod })),
	selectedCountry: '',
	changeSelectedCountry: countryId => set({ selectedCountry: countryId }),
	promoCode: '',
	changePromoCode: promoCode => set(() => ({ promoCode })),
	appliedPromoCode: '',
	applyPromoCode: value => set(() => ({ appliedPromoCode: value }))
}))
