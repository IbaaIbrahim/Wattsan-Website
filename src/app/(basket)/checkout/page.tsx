'use client'

import CheckoutView from '@components/modules/basket/checkout-view/CheckoutView'
import { TCheckoutInfo } from '@my-types/basket'
import { TUserInfo } from '@my-types/user'
import { basketService } from '@services/basket.service'
import { userService } from '@services/user.service'
import { useEffect, useState } from 'react'

// TODO Вынести в вызов апи
const request = async () => {
	const [checkoutInfo, userInfo] = await Promise.all([
		basketService.getCheckout(),
		userService.getUserInfo()
	])

	return [checkoutInfo, userInfo]
}

const Page = () => {
	const [data, setData] = useState<any>({})

	useEffect(() => {
		request().then(([checkoutInfo, userInfo]) => {
			setData({ checkoutInfo, userInfo })
		})
	}, [])

	if (!data?.checkoutInfo) return null

	return (
		<CheckoutView
			checkoutInfo={data?.checkoutInfo as TCheckoutInfo}
			userInfo={data?.userInfo as TUserInfo}
		/>
	)
}

export default Page
