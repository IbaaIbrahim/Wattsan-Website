import { getOrders } from '@store/basket/actions'
import { useEffect } from 'react'

export const useOrders = () => {
	useEffect(() => {
		getOrders()
	}, [])
}
