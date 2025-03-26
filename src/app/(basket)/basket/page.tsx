'use client'

import BasketView from '@components/modules/basket/basket-view/BasketView'
import { TBasketItems, TPopularItems } from '@my-types/basket'
import { TUserInfo } from '@my-types/user'
import { basketService } from '@services/basket.service'
import { userService } from '@services/user.service'
import { useEffect, useState } from 'react'

// TODO Вынести в вызов апи
const request = async () => {
	const [basket, userInfo] = await Promise.all([
		basketService.getBasket(),
		userService.getUserInfo()
	])

	return [basket, userInfo]
}

const Page = () => {
	const [data, setData] = useState<any>({})

	useEffect(() => {
		request().then(([basket, userInfo]) => {
			setData({ basket, userInfo })
		})
	}, [])

	if (!data?.basket) return null

	return (
		<div>
			<BasketView
				basket={
					data?.basket as {
						basketItems: TBasketItems
						popularItems: TPopularItems
					}
				}
				userInfo={data?.userInfo as TUserInfo}
			/>
		</div>
	)
}

export default Page
