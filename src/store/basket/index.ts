import { basketForm } from '@store/forms'
import { createStore } from 'zustand-x'
import { IOrder } from '@my-types/orders'

export type TCountry = {
	id: number
	name: string
	order: number
	isActive: boolean
}

export type TDeliveryMethod = {
	id: number
	name: string
	countryId: number
	order: number
	details: string
	cost: string
	isActive: boolean
}

export type TPosition = {
	addedTime: string
	clientId: string
	id: number
	isActive: boolean
	itemtype: 1 | 2 | 3
	quantity: number
	referenceId: number
	selected: boolean
	price?: number
	referenceObject: TOrderProduct['referenceObject']
}

export type TOrderProduct = {
	id: number
	price: number
	quantity: number
	referenceId: number
	itemtype: 1 | 2 | 3
	orderId: number
	order: any
	statusCategory: number
	status: number
	referenceObject: {
		id: number
		configurationName: string | null
		clientId: string | null
		client: any
		seriesId: number
		series: null
		workArea: 0
		workAreaChar: null
		zAxis: 0
		zAxisChar: null
		toolSwitch: 0
		toolSwitchChar: null
		spindle: 0
		spindleChar: null
		spindleQuantity: 0
		spindleQuantityChar: null
		motor: 0
		motorChar: null
		controlSystem: 0
		controlSystemChar: null
		liquidCoolingSystem: 0
		liquidCoolingSystemChar: null
		removableSensor: 0
		removableSensorChar: null
		buildInSensor: 0
		buildInSensorChar: null
		lubrucationSystem: 0
		lubrucationSystemChar: null
		aspiration: 0
		aspirationChar: null
		vaccumTable: 0
		vaccumTableChar: null
		rotaryDevice: 0
		rotaryDeviceChar: null
		cabine: 0
		cabineChar: null
		rotarySeparate: null
		rotarySeparateChar: null
		autoChangeTools: null
		autoChangeToolsChar: null
		status: null
		fileMangerId: null
		fileManger: null
		modelName: null
		price: string | number
	}
}

// export type TOrder = Partial<{
// 	id: number
// 	serial: number
// 	number: string
// 	fromDate: string
// 	deliveryMethodId: number
// 	deliveryMethod: {
// 		id: number
// 		name: string
// 		countryId: number
// 		order: number
// 		details: string
// 		cost: string
// 		isActive: boolean
// 	}
// 	deliveryDate: string
// 	isActive: boolean
// 	clientId: string
// 	user: any
// 	orderProducts: Partial<TOrderProduct>[]
// }>

export type TUseBasketStore = {
	countries: TCountry[]
	deliveryMethods: TDeliveryMethod[]
	positions: TPosition[]
	appliedPromoCode: string
	promoDiscount: number
	orders: IOrder[]
	order: IOrder
}

export const basketStore = createStore('basket')<TUseBasketStore>({
	countries: [],
	deliveryMethods: [],
	positions: [],
	appliedPromoCode: '',
	promoDiscount: 0,
	orders: [],
	order: {}
})
	.extendActions((set, get) => ({
		setPositions: positions => {
			set.positions(
				positions.map(position => {
					const itemPrice = Number(position?.price)
					const refPrice = Number(position?.referenceObject?.price)
					const orderPrice = Number(position?.referenceObject?.orderPrice)
					const seriesPrice = Number((position?.referenceObject as any)?.series?.startPrice)
					const resolvedPrice = itemPrice > 0
						? itemPrice
						: (refPrice > 0
							? refPrice
							: (orderPrice > 0
								? orderPrice
								: (seriesPrice > 0 ? seriesPrice : 1000)))

					return {
						...position,
						selected: true,
						price: resolvedPrice
					}
				})
			)
		},
		changePosition: (position: Partial<TPosition>) => {
			set.positions(
				get
					.positions()
					.map(currentPosition =>
						currentPosition.id === position.id
							? { ...currentPosition, ...position }
							: currentPosition
					)
			)
		},
		selectedAllPositions: selected => {
			set.positions(
				get.positions().map(position => ({ ...position, selected }))
			)
		},
		deletePosition: (id: number) => {
			set.positions(get.positions().filter(position => position.id !== id))
		}
	}))
	.extendSelectors((set, get) => ({
		deliveryMethodsSelector: ({ countryId }) =>
			get.deliveryMethods()?.filter(method => method?.countryId === countryId),
		deliveryMethodNameSelector: () =>
			get
				.deliveryMethods()
				?.find(
					({ id }) => basketForm.get.valuesSelector()?.deliveryMethod === id
				)?.name,
		allSelectedPositionsSelector: () =>
			get.positions().every(({ selected }) => selected),
		totalPriceSelector: () => {
			const selected = get.positions().filter(({ selected }) => selected)

			return (
				selected.reduce((acc, item) => {
					const itemPrice = Number(item?.price)
					const refPrice = Number((item?.referenceObject as any)?.price)
					const orderPrice = Number((item?.referenceObject as any)?.orderPrice)
					const seriesPrice = Number((item?.referenceObject as any)?.series?.startPrice)
					const price = itemPrice > 0
						? itemPrice
						: (refPrice > 0
							? refPrice
							: (orderPrice > 0
								? orderPrice
								: (seriesPrice > 0 ? seriesPrice : 1000)))
					const sum = (item?.quantity || 1) * price

					return acc + sum
				}, 0) - get.promoDiscount()
			)
		},
		mainPriceSelector: () => {
			const selected = get.positions().filter(({ selected }) => selected)

			return (
				selected.reduce((acc, item) => {
					const itemPrice = Number(item?.price)
					const refPrice = Number((item?.referenceObject as any)?.price)
					const orderPrice = Number((item?.referenceObject as any)?.orderPrice)
					const seriesPrice = Number((item?.referenceObject as any)?.series?.startPrice)
					const price = itemPrice > 0
						? itemPrice
						: (refPrice > 0
							? refPrice
							: (orderPrice > 0
								? orderPrice
								: (seriesPrice > 0 ? seriesPrice : 1000)))
					const sum = (item?.quantity || 1) * price

					return acc + sum
				}, 0)
			)
		},
		orderTotalPriceSelector: () => {
			const products = get.order()?.orderProducts ?? []

			return products.reduce((acc, item) => {
				const itemPrice = Number(item?.price)
				const refPrice = Number((item?.referenceObject as any)?.price)
				const orderPrice = Number((item?.referenceObject as any)?.orderPrice)
				const seriesPrice = Number((item?.referenceObject as any)?.series?.startPrice)
				const price = itemPrice > 0
					? itemPrice
					: (refPrice > 0
						? refPrice
						: (orderPrice > 0
							? orderPrice
							: (seriesPrice > 0 ? seriesPrice : 1000)))
				return acc + price * (item?.quantity || 1)
			}, 0)
		}
	}))
