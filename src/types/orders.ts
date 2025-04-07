export interface IOrder {
	"id": string | number,
	"serial": string | number,
	"number": string | number
	"fromDate": string
	"deliveryMethodId": string | number
	"deliveryMethod": {
		"id": string | number
		"name": string
		"countryId": number
		"order": number
		"details": string
		"cost": string
	},
	"deliveryDate": string
	"isActive": boolean
	"couponId": string | number
	"coupon": any
	"clientId": string
	orderProducts: IOrderInfo[]
}

export interface IOrderInfo {
	id: number
	"price": number
	"quantity": number
	"referenceId": number
	"itemtype": number
	"orderId": number
	"statusCategory": number
	"status": number
	"referenceObject":{
		"id": number
		fileManger: {
			id: number
			url: string
		}
	}
}

export type IOrders = IOrder[]

export type OrdersStore = {
	ordersFilter: string[]
	changeOrdersFilter: (id: string) => void
	notificationFilter: string[]
	changeNotificationFilter: (id: string) => void
}
