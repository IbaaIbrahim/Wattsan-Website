'use client'

import NotificationImages from '@components/modules/account/notification-images/NotificationImages'
import Notifications from '@components/modules/account/notifications/Notifications'
import EquipmentPreview from '@components/modules/common/equipment-preview/EquipmentPreview'
import Plate from '@components/modules/common/plate/Plate'
import OrderPlate from '@components/modules/orders/order-plate/OrderPlate'
import Button from '@components/ui/button/Button'
import IconBadge from '@components/ui/icon-badge/IconBadge'
import Status from '@components/ui/status/Status'
import { IDashboard } from '@my-types/dashboard'
import lastOrderEmpty from '@public/img/account/last-order-empty.svg'
import accountIcon from '@public/img/icons/account.svg'
import basketIcon from '@public/img/icons/basket.svg'
import bellIcon from '@public/img/icons/bell.svg'
import { authStore } from '@store/auth'
import { dashboardStore } from '@store/dashboardStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import styles from './DashboardView.module.scss'

const MOCK_NOTIFICATIONS = [
	{
		id: '999',
		type: '1',
		icon: accountIcon,
		title: 'Account',
		message:
			"New login detected! Check your auth activity for security. If it's not you, change your password immediately to secure your auth.",
		date: '23 dec, 11:34 am'
	},
	{
		id: '1000',
		type: '2',
		icon: basketIcon,
		title: 'Order № 17490 03 30',
		message: (
			<>
				At the moment, we're in the process of manufacturing parts for your
				laser machine.
				<NotificationImages
					images={[
						'/img/auth/notification-mock-image.png',
						'/img/auth/notification-mock-image.png',
						'/img/auth/notification-mock-image.png',
						'/img/auth/notification-mock-image.png',
						'/img/auth/notification-mock-image.png'
					]}
				/>
			</>
		),
		date: '23 dec, 11:34 am'
	},
	{
		id: '1001',
		type: '2',
		icon: basketIcon,
		title: 'Order № 17490 03 30',
		message: (
			<>
				We've prepared a payment link for your order. You can also click on the
				“Pay” button located next to the total order price.
				<Button
					href='/'
					size='s'
					view='bordered'
				>
					Payment link
				</Button>
				<div className={styles.bleached}>
					The payment link is valid for 24 hours.
				</div>
			</>
		),
		date: '23 dec, 11:34 am'
	}
]

const DashboardView: FC<{ dashboard: IDashboard }> = ({ dashboard }) => {
	const router = useRouter()

	const notificationFilter = dashboardStore(state => state.notificationFilter)
	const changeNotificationFilter = dashboardStore(
		state => state.changeNotificationFilter
	)

	const handleOrders = () => {
		router.push('/orders')
	}
	const handleConfigurations = () => {
		router.push('/configurations')
	}
	const handleEquipment = () => {
		router.push('/equipment')
	}

	const [showNotification, setShowNotification] = useState(false)

	return (
		<>
			<header className={styles.header}>
				<h2 className={styles.title}>Hello, {dashboard.userName}</h2>
				<Button
					className={styles.notificationButton}
					size='s'
					view='default'
					leftAddon={
						<IconBadge
							icon={bellIcon}
							badge={MOCK_NOTIFICATIONS.length}
						/>
					}
					onClick={() => setShowNotification(!showNotification)}
				>
					<div className={styles.notificationButtonText}>Notifications</div>
				</Button>
			</header>
			<div className={styles.wrapper}>
				<section className={styles.content}>
					{dashboard.lastOrder === null ? (
						<Plate
							hover={false}
							title='Last order'
						>
							<div className={styles.lastOrderContent}>
								<div>
									<h4 className={styles.lastOrderEmptyTitle}>
										You don't have any orders yet
									</h4>
									<p className={styles.lastOrderEmptySubtitle}>
										Your recent order details will appear here after your
										purchase. Start shopping to view!
									</p>
									<Button size='l'>Start shopping</Button>
								</div>
								<Image
									className={styles.lastOrderImage}
									src={lastOrderEmpty}
									alt=''
								/>
							</div>
						</Plate>
					) : (
						<OrderPlate
							title='Last order'
							order={dashboard.lastOrder}
						/>
					)}
					<Plate
						title='All orders'
						rightAddon={
							<EquipmentPreview
								show={2}
								total={50}
								items={[
									'/img/grid-machines/A1.png',
									'/img/grid-machines/A1.png'
								]}
							/>
						}
						onClick={handleOrders}
					>
						<div className={styles.ordersByStatus}>
							<Status
								text='Current'
								counter={dashboard.otherOrders?.current}
								counterView='yellow'
							/>
							<Status
								text='Completed'
								counter={dashboard.otherOrders?.completed}
								counterView='green'
							/>
							<Status
								text='Canceled'
								counter={dashboard.otherOrders?.canceled}
								counterView='red'
							/>
							<Status
								text='Returns'
								counter={dashboard.otherOrders?.returns}
								counterView='purple'
							/>
						</div>
					</Plate>
					<div className={styles.items}>
						<Plate
							title='Configurations'
							subtitle='Create and manage your 3D equipment configurations'
							rightAddon={
								<EquipmentPreview
									total={2}
									items={['/img/grid-machines/A1.png']}
									combinedPreview={true}
								/>
							}
							onClick={handleConfigurations}
						/>
						<Plate
							title='My equipment'
							subtitle='Explore all your Wattsan gear in one spot'
							rightAddon={
								<EquipmentPreview
									total={999}
									items={['/img/grid-machines/A1.png']}
									combinedPreview={true}
								/>
							}
							onClick={handleEquipment}
						/>
					</div>
				</section>
				<Notifications
					show={showNotification}
					filters={[
						{ content: 'All', id: '0' },
						{ content: 'Account', id: '1' },
						{ content: 'Orders', id: '2' },
						{ content: 'Personal offers', id: '3' }
					]}
					selectedFilter={notificationFilter}
					notifications={
						notificationFilter.includes('0')
							? MOCK_NOTIFICATIONS
							: MOCK_NOTIFICATIONS.filter(
									({ type }) => type === notificationFilter?.[0]
								)
					}
					onChange={changeNotificationFilter}
					onClose={() => setShowNotification(!showNotification)}
				/>
			</div>
		</>
	)
}

export default DashboardView
