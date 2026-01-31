'use client'

import Notifications from '@components/modules/account/notifications/Notifications'
import OrderItemPlate from '@components/modules/orders/order-item-plate/OrderItemPlate'
import Button from '@components/ui/button/Button'
import IconBadge from '@components/ui/icon-badge/IconBadge'
import { MODALS } from '@components/ui/modal/Modal'
import Status from '@components/ui/status/Status'
import { IOrder, IOrderInfo, OrdersStore } from '@my-types/orders'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import bellIcon from '@public/img/icons/bell.svg'
import orderDownloadIcon from '@public/img/icons/order-download.svg'
import repeatIcon from '@public/img/icons/repeat.svg'
import returnIcon from '@public/img/icons/return.svg'
import { modalsStore } from '@store/modals'
import { ordersStore } from '@store/ordersStore'
import Image from 'next/image'
import { FC, useState } from 'react'
import _ from 'lodash'

import styles from './OrderView.module.scss'

const MOCK_ITEMS = [
	{
		imgSrc: '/img/grid-machines/A1.png',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000'
	},
	{
		imgSrc: '/img/grid-machines/M1.png',
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		imgSrc: '/img/grid-machines/A1.png',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000'
	},
	{
		imgSrc: '/img/grid-machines/M1.png',
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	}
]

const STATUS_MAP = {
	Completed: 'green',
	Processing: 'yellow',
	Production: 'yellow',
	Canceled: 'red'
}

const PAYMENT_STATUS = 'Processing'
const ACTIONS_AVAILABLE_STATUS = 'Completed'

const OrderView: FC<{
	order: IOrder
}> = ({ order }) => {
	const notificationFilter = ordersStore(
		(state: OrdersStore) => state.notificationFilter
	)
	const changeNotificationFilter = ordersStore(
		(state: OrdersStore) => state.changeNotificationFilter
	)

	const handleRepeat = () => {
		modalsStore.set.open(MODALS.orderRepeatSuccess, {})
	}

	const handleSubmitReturn = () => {
		modalsStore.set.open(MODALS.returnOrderSuccess, {})
	}

	const handlePayOrder = () => {}

	const [showNotification, setShowNotification] = useState(false)

	return (
		<div className={styles.orderView}>
			<div>
				{/* <div className={styles.navigationWrapper}>
					<Button
						className={styles.navigation}
						href='/orders'
						view='default'
						leftAddon={
							<Image
								src={arrowSrc}
								alt=''
							/>
						}
					>
						Back to Orders
					</Button>
					<Button
						className={styles.notificationButton}
						size='s'
						view='default'
						leftAddon={
							<IconBadge
								icon={bellIcon}
								badge={99}
							/>
						}
						onClick={() => setShowNotification(!showNotification)}
					>
						<div className={styles.notificationButtonText}>Notifications</div>
					</Button>
				</div> */}
				<div className={styles.header}>
					<div className={styles.info}>
						<div className={styles.id}>№&nbsp;{order.id}</div>
						{/*<div className={styles.createDate}>*/}
						{/*	from:&nbsp;{order.createDate}*/}
						{/*</div>*/}
						{/*<div className={styles.statusWrapper}>*/}
						{/*	<Status*/}
						{/*		text={order.status}*/}
						{/*		view={STATUS_MAP[order.status]}*/}
						{/*	/>*/}
						{/*	<div className={styles.statusDescription}>*/}
						{/*		{order.status}*/}
						{/*	</div>*/}
						{/*</div>*/}
					</div>
					{/* <div className={styles.actions}>
						<Button
							leftAddon={
								<Image
									src={orderDownloadIcon}
									alt=''
								/>
							}
							size='s'
							view='accent'
							withoutBorder={true}
							// disabled={order.status !== ACTIONS_AVAILABLE_STATUS}
							onClick={() => {
								modalsStore.set.open(MODALS.downloadReceipt, {
									file: {
										title: 'Invoice for order № 5678 593 15',
										name: 'Invoice_Order_5678 593 15.pdf'
									}
								})
							}}
						>
							Download receipt
						</Button>
						<Button
							leftAddon={
								<Image
									src={repeatIcon}
									alt=''
								/>
							}
							size='s'
							view='accent'
							withoutBorder={true}
							// disabled={order.status !== ACTIONS_AVAILABLE_STATUS}
							onClick={() => {
								modalsStore.set.open(MODALS.orderRepeat, {
									items: MOCK_ITEMS,
									onRepeat: handleRepeat
								})
							}}
						>
							Repeat order
						</Button>
						<Button
							leftAddon={
								<Image
									src={returnIcon}
									alt=''
								/>
							}
							size='s'
							view='accent'
							withoutBorder={true}
							// disabled={order.status !== ACTIONS_AVAILABLE_STATUS}
							onClick={() => {
								modalsStore.set.open(MODALS.returnOrder, {
									items: MOCK_ITEMS,
									onSubmit: handleSubmitReturn
								})
							}}
						>
							Return order
						</Button>
					</div> */}
				</div>
				<div className={styles.divider} />
				<div className={styles.deliveryInfo}>
					<div className={styles.methodWrapper}>
						<div className={styles.methodTitle}>Delivery method</div>
						<div className={styles.method}>
							<span>{order.deliveryMethod.name}</span>
							<span>China</span>
						</div>
					</div>
					<div className={styles.priceWrapper}>
						<div className={styles.price}>
							<span className={styles.priceTitle}>Total</span>
							${_.sumBy(order.orderProducts, x => x.price * x.quantity) - (order?.coupon?.maxPurchaseDiscount ?? 0)}
						</div>
						<div className={styles.deliveryPrice}>
							{order?.deliveryMethod.cost ?? 'Delivery not included'}
						</div>
						{/*{order.status === PAYMENT_STATUS && (*/}
						{/*	<Button*/}
						{/*		className={styles.paymentAction}*/}
						{/*		view='black'*/}
						{/*		size='l'*/}
						{/*		onClick={handlePayOrder}*/}
						{/*	>*/}
						{/*		Pay order*/}
						{/*	</Button>*/}
						{/*)}*/}
					</div>
				</div>
				<div className={styles.itemsWrapper}>
					<div className={styles.itemsTitle}>Items</div>
					{order.orderProducts.map(item => {
						return (
							<OrderItemPlate
								key={item.id}
								item={item}
							/>
						)
					})}
				</div>
			</div>
			{/* <Notifications
				show={showNotification}
				selectedFilter={notificationFilter}
				filters={[
					{ content: 'All', id: '0' },
					{ content: 'Security', id: '1' },
					{ content: 'Orders', id: '2' },
					{ content: 'Discounts and promotions', id: '3' }
				]}
				notifications={[]}
				onChange={changeNotificationFilter}
				onClose={() => setShowNotification(false)}
			/> */}
		</div>
	)
}

export default OrderView
