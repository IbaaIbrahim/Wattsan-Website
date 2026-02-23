import quantity from '@components/modules/basket/quantity/Quantity'
import { MODALS } from '@components/ui/modal/Modal'
import {
	API_CREATE_BASKET,
	API_GET_BASKETS,
	API_GET_CHECK_COUPON,
	API_GET_COUNTRIES,
	API_GET_DELIVERY_METHODS,
	API_GET_ORDERS,
	API_GET_REAL_ATTACHMENTS,
	API_GET_SUPPORT_ASSETS_BY_TAG,
	API_ORDERS_CREATE, API_VERIFY_URL
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

		// if (
		// 	!clientId ||
		// 	requestsStore.get.statusSelector(API_GET_BASKETS) !== STATUSES.idle
		// )
		// 	return

		if (
			!clientId
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

		const response = await request({
			url: API_GET_COUNTRIES,
			method: 'GET'
		})

		basketStore.set.countries(response?.data)

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

		const response = await request({
			url: API_GET_DELIVERY_METHODS,
			method: 'GET'
		})

		basketStore.set.deliveryMethods(response?.data)

		requestsStore.set.updateRequest(API_GET_DELIVERY_METHODS, STATUSES.success)
	} catch (error) {
		console.error(error)

		requestsStore.set.updateRequest(API_GET_DELIVERY_METHODS, STATUSES.failure)
	}
}

export const getOrders = async () => {
	try {
		const response = await request({
			url: API_GET_ORDERS,
			method: 'GET'
		})

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
		const response = await request({
			url: API_GET_ORDERS,
			method: 'GET',
			query: { filter: `clientId~eq~'${clientId}'~and~id~eq~'${id}'` }
		})

		basketStore.set.order(response?.data?.[0])
		return response.data?.[0]
	} catch (error) {
		console.error(error)
	}
}

export const getModelYoutubeLink = async ({
	modelId,
	seriesId
}: {
	modelId: number
	seriesId: number
}) => {
	try {
		const response = await request({
			url: API_GET_REAL_ATTACHMENTS,
			method: 'GET',
			query: { filter: `seriesId~eq~'${seriesId}'~and~modelId~eq~'${modelId}'~and~attachmentType~eq~'4'` }
		})

		// basketStore.set.order(response?.data?.[0])
		return response.data?.[0]
	} catch (error) {
		console.error(error)
	}
}

export const getSupportAssetsByTag = async (tagName: string) => {
	try {
		const response = await request({
			url: API_GET_SUPPORT_ASSETS_BY_TAG,
			method: 'GET',
			query: { tagName }
		})

		return response?.data || [] // Returns all matched support assets
	} catch (error) {
		console.error(error)
		return []
	}
}

export const createOrder = async (router) => {
	try {
		const clientId = authStore.get.clientId()

		const { deliveryMethod } = basketForm.get.valuesSelector()
		const positions = basketStore.get.positions()
		const couponCode = basketStore.get.appliedPromoCode() ?? ''

		console.log({
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

export const checkCoupon = async (totalAmount) => {
	try {
		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.loading)

		const { promoCode } = basketForm.get.valuesSelector()

		const response = await request({
			url: API_GET_CHECK_COUPON,
			method: 'GET',
			query: {
				code: promoCode,
				totalAmount
			}
		})

		if (response?.content !== null) {
			requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.success)

			basketStore.set.appliedPromoCode(`${promoCode}`)
			basketStore.set.promoDiscount(response?.content)

			return
		}

		basketForm.set.change('promoCode', '')
		basketStore.set.appliedPromoCode('')

		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.failure)
		return
	} catch (error) {
		console.error(error)

		requestsStore.set.updateRequest(API_GET_CHECK_COUPON, STATUSES.failure)
		return
	}
}
