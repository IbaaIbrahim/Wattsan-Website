export interface IDashboard {
	userName: string
	lastOrder: {
		id: string
		status: string
		price: string
		createDate: string
		deliveryDate: string
	}
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
