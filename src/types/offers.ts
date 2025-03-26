export type TPromoCode = {
	id: string
	header: string
	title: string
	description: string
	expirationDate: string
	promoCode: string
	terms: string[]
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
