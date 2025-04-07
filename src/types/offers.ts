export type TPromoCode = {
	id: string,
	couponAmount: number,
	couponType: number,
	couponCode: string,
	minPurchaseAmount: number,
	maxPurchaseDiscount: number,
	insertDate: string,
	validFromDate: string,
	validToDate: string,
	couponStatus: boolean
}

export type TPromoCodes = TPromoCode[]

export type TOffer = {
	id: string
	image: string
	tag: string
	title: string
	description: string
	terms: string[]
}

export type TOffers = TOffer[]
