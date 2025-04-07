'use client'

import OrdersList from '@components/modules/orders/orders-list/OrdersList'
import Button from '@components/ui/button/Button'
import Tags from '@components/ui/tags/Tags'
import { IOrders } from '@my-types/orders'
import lastOrderEmpty from '@public/img/account/last-order-empty.svg'
import { ordersStore } from '@store/ordersStore'
import Image from 'next/image'
import { FC } from 'react'

import styles from './AllOrders.module.scss'
import _ from 'lodash'

const STATUS_MAP = {
	Current: '1',
	Completed: '2',
	Canceled: '3',
	Returns: '4'
}

const AllOrders: FC<{ orders: IOrders }> = ({ orders }) => {
	const filters = ordersStore(state => state.ordersFilter)
	const changeFilters = ordersStore(state => {
		return state.changeOrdersFilter
	})

	const filtered = filters.includes('0')
		? orders
		: orders.filter(({ orderProducts }) => orderProducts.some(orderProduct => filters.includes(`${orderProduct.statusCategory}`)))

	const isEmpty = orders.length === 0

	return (
		<>
			<h2 className={styles.title}>Orders</h2>
			<Tags
				selected={filters}
				size='l'
				disabled={isEmpty}
				items={[
					{ content: 'All orders', counter: `${_.size(orders)}`, id: '0' },
					{
						content: 'Current',
						counter: `${_.size(orders.filter(({ orderProducts }) => orderProducts.some(orderProduct => ['1'].includes(`${orderProduct.statusCategory}`))))}`,
						id: '1'
					},
					{
						content: 'Completed',
						counter: `${_.size(orders.filter(({ orderProducts }) => orderProducts.some(orderProduct => ['2'].includes(`${orderProduct.statusCategory}`))))}`,
						id: '2'
					},
					{
						content: 'Canceled',
						counter: `${_.size(orders.filter(({ orderProducts }) => orderProducts.some(orderProduct => ['3'].includes(`${orderProduct.statusCategory}`))))}`,
						id: '3'
					},
					{
						content: 'Returns',
						counter: `${_.size(orders.filter(({ orderProducts }) => orderProducts.some(orderProduct => ['4'].includes(`${orderProduct.statusCategory}`))))}`,
						id: '4'
					}
				]}
				onClick={changeFilters}
			/>
			{isEmpty ? (
				<div className={styles.emptyContent}>
					<Image
						className={styles.emptyImage}
						src={lastOrderEmpty}
						alt=''
					/>
					<div className={styles.emptyDescription}>
						<h3 className={styles.emptyTitle}>
							You don't have any <br />
							orders yet
						</h3>
						<p className={styles.emptySubtitle}>
							Your recent order details will appear here after your <br />
							purchase. Start shopping to view!
						</p>
						<Button size='l'>Start shopping</Button>
					</div>
				</div>
			) : (
				<OrdersList orders={filtered} />
			)}
		</>
	)
}

export default AllOrders
