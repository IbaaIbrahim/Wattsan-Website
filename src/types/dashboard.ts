import { IOrder } from '@my-types/orders'

export interface IDashboard {
	userName: string
	lastOrder: IOrder
	otherOrders: {
		all: string
		current: string
		completed: string
		canceled: string
		returns: string
	}
	configurations: string
	equipment: string
}

export interface DashboardStore {
	info: IDashboard
	saveDashboard: (newDashboard: DashboardStore['info']) => void
	notificationFilter: string[]
	changeNotificationFilter: (id: string) => void
}
