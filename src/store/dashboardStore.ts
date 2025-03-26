import { create } from 'zustand'

import { DashboardStore } from '../types/dashboard'

export const dashboardStore = create<DashboardStore>(set => ({
	info: {
		userName: '',
		lastOrder: {
			id: '',
			status: '',
			price: '',
			createDate: '',
			deliveryDate: ''
		},
		otherOrders: {
			all: '0',
			current: '0',
			canceled: '0',
			completed: '0',
			returns: '0'
		},
		equipment: '0',
		configurations: '0'
	},
	saveDashboard: dashboard => set(() => ({ info: dashboard })),
	notificationFilter: ['0'],
	changeNotificationFilter: id =>
		set(state => ({
			notificationFilter: state.notificationFilter.includes(id) ? ['0'] : [id]
		}))
}))
