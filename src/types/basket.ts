import { IConfiguration } from '@my-types/configurations'

export type TBasketItem = {
	selected: boolean // old from passing parameters to component
	image: string // old from passing parameters to component
	name: string // old from passing parameters to component
	code: string // old from passing parameters to component
	status: string // old from passing parameters to component
	limit: number // old from passing parameters to component
	price: number // old from passing parameters to component
	discount: number // old from passing parameters to component

	"id": string
	"referenceId": number
	"itemtype": number
	"clientId": string
	"quantity": number
	"isActive": boolean
	"addedTime": string
	"user": any
	"referenceObject": IConfiguration
}

export type TBasketItems = TBasketItem[]

export type TPopularItem = {
	id: string
	image: string
	name: string
	code: string
	modification: string
	price: string
}

export type TPopularItems = TPopularItem[]

export type TCountry = {
	id: string
	text: string
}

export type TDeliveryMethod = {
	id: string
	name: string
	cost: string
	conditions: string[]
}

export type TCheckoutInfo = {
	countries: TCountry[]
	deliveryMethods: TDeliveryMethod[]
}

export type TOrderInfo = {
	id: string
	createDate: string
	status: string
	statusInfo: string
	price: string
	preview: string[]
	steps: { title: string; subtitle: string; url: string }[]
	video: {
		title: string
		videoSrc: string
		preview: string
	}
	blog: {
		image: string
		tags: string[]
		title: string
		subtitle: string
		url: string
	}[]
}

export type TBasketStore = {
	isLogged: boolean
	changeLogged: (logged: boolean) => void
	items: TBasketItems
	saveItems: (items: TBasketItems) => void
	changeSelected: (id: string) => void
	changeQuantity: (id: string, quantity: number) => void
	changeAllSelect: () => void
	checkoutInfo: TCheckoutInfo
	saveCheckoutInfo: (checkoutInfo: TCheckoutInfo) => void
	deliveryMethod: string
	changeDeliveryMethod: (deliveryMethod: string) => void
	selectedCountry: string
	changeSelectedCountry: (countryId: string) => void
	promoCode: string
	changePromoCode: (promoCode: string) => void
	appliedPromoCode: string
	applyPromoCode: (value: string) => void
}
