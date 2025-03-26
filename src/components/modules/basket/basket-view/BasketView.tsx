'use client'

import EmptyBasket from '@components/modules/basket/empty-basket/EmptyBasket'
import OrderInfo from '@components/modules/basket/order-info/OrderInfo'
import { TBasketItems, TPopularItems } from '@my-types/basket'
import { TUserInfo } from '@my-types/user'
import { basketStore } from '@store/basketStore'
import { FC, useEffect } from 'react'

import styles from './BasketView.module.scss'

const BasketView: FC<{
	basket: { basketItems: TBasketItems; popularItems: TPopularItems }
	userInfo: TUserInfo
}> = ({ basket, userInfo }) => {
	const { items, saveItems, changeLogged } = basketStore(
		({ items, saveItems, changeLogged }) => ({
			items,
			saveItems,
			changeLogged
		})
	)

	useEffect(() => {
		saveItems(basket.basketItems)
		changeLogged(userInfo.authorized)
	}, [basket, userInfo])

	return (
		<>
			<div className={styles.title}>Basket</div>
			{items.length === 0 ? (
				<EmptyBasket popularItems={basket.popularItems} />
			) : (
				<OrderInfo />
			)}
		</>
	)
}

export default BasketView
