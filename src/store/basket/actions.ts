import quantity from '@components/modules/basket/quantity/Quantity'
import { MODALS } from '@components/ui/modal/Modal'
import {
	API_CREATE_BASKET,
	API_GET_BASKETS,
	API_GET_CHECK_COUPON,
	API_GET_COUNTRIES,
	API_GET_DELIVERY_METHODS,
	API_GET_ORDERS,
	API_ORDERS_CREATE
} from '@constants/api'
import { authStore } from '@store/auth'
import { basketStore } from '@store/basket/index'
import { configuratorStore } from '@store/configurator'
import { basketForm } from '@store/forms'
import { modalsStore } from '@store/modals'
import { STATUSES, requestsStore } from '@store/requests'
import qs from 'query-string'

import { PAGES } from '../../config/pages.url.config'
import { pickAll } from '../../utils/helpers'
import { authorizedRequest, request } from '../../utils/request'

export const getBaskets = async () => {
	try {
		const clientId = authStore.get.clientId()

		if (
			!clientId ||
			requestsStore.get.statusSelector(API_GET_BASKETS) !== STATUSES.idle
		)
			return

		const response = await authorizedRequest({
			url: API_GET_BASKETS,
			method: 'GET',
			query: {
				filter: `clientId~eq~'${clientId}'`
			}
		})

		basketStore.set.setPositions(response?.data)
	} catch (error) {
		console.error(error)
	}
}

export const createBasket = async () => {
	try {
		const clientId = authStore.get.clientId()
		const referenceId = configuratorStore.get.savedReferenceId()

		const response = await authorizedRequest({
			url: API_CREATE_BASKET,
			method: 'POST',
			data: {
				referenceId,
				/** Хардкод на время разработки, сейчас доступны только целые конфигурации */
				itemtype: 1,
				clientId,
				quantity: 1
			}
		})

		modalsStore.set.open(MODALS.addToBasketModal)
	} catch (error) {
		console.error(error)
	}
}

export const getCountries = async () => {
	try {
		if (requestsStore.get.statusSelector(API_GET_COUNTRIES) !== STATUSES.idle)
			return

		requestsStore.set.updateRequest(API_GET_COUNTRIES, STATUSES.loading)

		const response = await request(API_GET_COUNTRIES, 'GET')

		basketStore.set.countries(response?.data?.data)

		requestsStore.set.updateRequest(API_GET_COUNTRIES, STATUSES.success)
	} catch (error) {
		console.error(error)

		requestsStore.set.updateRequest(API_GET_COUNTRIES, STATUSES.failure)
	}
}

export const getDeliveryMethods = async () => {
	try {
		if (
			requestsStore.get.statusSelector(API_GET_DELIVERY_METHODS) !==
			STATUSES.idle
		)
			return

		requestsStore.set.updateRequest(API_GET_DELIVERY_METHODS, STATUSES.loading)

		const response = await request(API_GET_DELIVERY_METHODS, 'GET')

		basketStore.set.deliveryMethods(response?.data?.data)

		requestsStore.set.updateRequest(API_GET_DELIVERY_METHODS, STATUSES.success)
	} catch (error) {
		console.error(error)

		requestsStore.set.updateRequest(API_GET_DELIVERY_METHODS, STATUSES.failure)
	}
}

export const getOrders = async () => {
	try {
		const response = await request(API_GET_ORDERS, 'GET')

		basketStore.set.orders(response?.data)
	} catch (error) {
		console.error(error)
	}
}

export const getOrder = async ({
	id,
	clientId
}: {
	id: string
	clientId: string
}) => {
	try {
		const response = await request(
			qs.stringifyUrl({
				url: API_GET_ORDERS,
				query: { filter: `clientId~eq~'${clientId}'~and~id~eq~'${id}'` }
			} as any),
			'GET'
		)

		basketStore.set.order(response?.data?.data?.[0])
		return response.data?.data?.[0]
	} catch (error) {
		console.error(error)
	}
}

export const createOrder = async router => {
	try {
		const clientId = authStore.get.clientId()

		const { deliveryMethod } = basketForm.get.valuesSelector()
		const positions = basketStore.get.positions()
		const couponCode = basketStore.get.appliedPromoCode() ?? ''

		const response = await authorizedRequest({
			url: API_ORDERS_CREATE,
			method: 'POST',
			data: {
				deliveryMethodId: deliveryMethod as number,
				clientId,
				couponCode: couponCode,
				orderProducts: positions
					.filter(
						({ selected, quantity, price }: any) =>
							selected && quantity > 0 && !!+(price ?? 0)
					)
					.map(position =>
						pickAll(['itemtype', 'referenceId', 'price', 'quantity'], position)
					)
			}
		})

		if (response?.data?.length > 0) {
			const orderId = response?.data?.[0]?.id

			router.push(PAGES.checkoutId(orderId, clientId))
		}

		return
	} catch (error) {
		console.error(error)
	}
}

export const checkCoupon = async () => {
	try {
		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.loading)

		const { promoCode } = basketForm.get.valuesSelector()
		const totalAmount = basketStore.get.totalPriceSelector()

		const response = await request(
			qs.stringifyUrl({
				url: API_GET_CHECK_COUPON,
				query: {
					code: promoCode,
					totalAmount
				}
			}),
			'GET'
		)

		if (response?.data?.content !== null) {
			requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.success)

			basketStore.set.promoDiscount(response?.data?.content)

			return
		}

		basketForm.set.change('promoCode', '')
		basketStore.set.appliedPromoCode(promoCode as string)

		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.failure)
		return
	} catch (error) {
		console.error(error)

		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.failure)
		return
	}
}
