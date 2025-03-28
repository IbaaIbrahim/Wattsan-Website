import { authStore } from '@store/auth'
import {
	getBaskets,
	getCountries,
	getDeliveryMethods
} from '@store/basket/actions'
import { useEffect } from 'react'

export const useBasket = () => {
	useEffect(() => {
		getCountries()
		getDeliveryMethods()
	}, [])

	const authorized = authStore.use.authorized()

	useEffect(() => {
		getBaskets()
	}, [authorized])

	return null
}
