export interface IOrder {
	id: string
	createDate: string
	price: string
	status: string
	deliveryDate: string
}

export interface IOrderInfo {
	id: string
	createDate: string
	status: string
	statusDescription: string
	deliveryMethod: {
		company: string
		country: string
		price: string
	}
	receiptDocument: string
	price: string
	items: { imgSrc: string; name: string; code: string; price: string }[]
}

export type IOrders = IOrder[]

export type OrdersStore = {
	ordersFilter: string[]
	changeOrdersFilter: (id: string) => void
	notificationFilter: string[]
	changeNotificationFilter: (id: string) => void
}
