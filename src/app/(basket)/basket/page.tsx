'use client'

import BasketView from '@components/modules/basket/basket-view/BasketView'
import { PageLoader } from '@components/modules/page-loader'
import {
	API_GET_BASKETS,
	API_GET_COUNTRIES,
	API_GET_DELIVERY_METHODS
} from '@constants/api'
import { useBasket } from '@hooks/use-basket'
import { requestsStore } from '@store/requests'

const REQUESTS = [API_GET_COUNTRIES, API_GET_DELIVERY_METHODS, API_GET_BASKETS]

const Page = () => {
	useBasket()

	const loading = requestsStore.use.multipleLoadingSelector(REQUESTS)
	const notInitialized = requestsStore.use.multipleIdleSelector(REQUESTS)

	return (
		<div>
			<PageLoader visible={loading || notInitialized} />
			<BasketView />
		</div>
	)
}

export default Page
