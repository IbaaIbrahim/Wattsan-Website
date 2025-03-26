import { OrdersStore } from '@my-types/orders'
import { create } from 'zustand'

export const ordersStore = create<OrdersStore>(set => ({
	ordersFilter: ['0'],
	notificationFilter: ['0'],
	changeNotificationFilter: id =>
		set(state => {
			return {
				notificationFilter: [state.ordersFilter.includes(id) ? '0' : id]
			}
		}),
	changeOrdersFilter: id =>
		set(state => {
			return {
				ordersFilter: [state.ordersFilter.includes(id) ? '0' : id]
			}
		})
}))
