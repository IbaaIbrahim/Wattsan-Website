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

const STATUS_MAP = {
	Completed: '2',
	Canceled: '3',
	Current: '1',
	Returns: '4'
}

const AllOrders: FC<{ orders: IOrders }> = ({ orders }) => {
	const filters = ordersStore(state => state.ordersFilter)
	const changeFilters = ordersStore(state => state.changeOrdersFilter)

	const filtered = filters.includes('0')
		? orders
		: orders.filter(({ status }) => filters.includes(STATUS_MAP[status]))

	const isEmpty = orders.length === 0

	return (
		<>
			<h2 className={styles.title}>Orders</h2>
			<Tags
				selected={filters}
				size='l'
				disabled={isEmpty}
				items={[
					{ content: 'All orders', counter: '99', id: '0' },
					{
						content: 'Current',
						counter: '0',
						id: '1'
					},
					{
						content: 'Completed',
						counter: '0',
						id: '2'
					},
					{
						content: 'Canceled',
						counter: '0',
						id: '3'
					},
					{
						content: 'Returns',
						counter: '0',
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
