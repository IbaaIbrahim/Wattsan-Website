'use client'

import Menu from '@components/modules/common/menu/Menu'
import { useMatchMedia } from '@hooks/useMatchMedia'
import AccountIcon from '@public/img/icons/account.svg'
import ConfigIcon from '@public/img/icons/config.svg'
import DashIcon from '@public/img/icons/dash.svg'
import EquipmentIcon from '@public/img/icons/equipment.svg'
import LogOutIcon from '@public/img/icons/log-out.svg'
import OrdersIcon from '@public/img/icons/orders.svg'
import PersOffersIcon from '@public/img/icons/pers-offers.svg'
import RightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './Sibebar.module.scss'

const menuItems = [
	// {
	// 	icon: DashIcon,
	// 	content: 'Dashboard',
	// 	href: PAGES.dashboard
	// },
	{
		icon: OrdersIcon,
		content: 'Orders',
		href: PAGES.orders
	},
	{
		icon: ConfigIcon,
		content: 'Configurations',
		href: PAGES.configurations
	},
	// {
	// 	icon: EquipmentIcon,
	// 	content: 'My equipment',
	// 	href: PAGES.equipment
	// },
	{
		icon: PersOffersIcon,
		content: 'Personal offers',
		href: PAGES.offers
	},
	{
		icon: AccountIcon,
		content: 'Account',
		href: PAGES.account
	}
]

const logoutItems = [
	// {
	// 	icon: PersOffersIcon,
	// 	content: 'Support',
	// 	href: PAGES.accountSupport
	// },
	{
		icon: LogOutIcon,
		content: 'Log out',
		href: PAGES.logout
	}
]

const Sidebar: FC = () => {
	const pathname = usePathname()
	const [isTablet] = useMatchMedia('max-width: 1440px', null)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(false)
	}, [pathname])

	useEffect(() => {
		if (!isTablet) {
			setOpen(false)
		}
	}, [isTablet])

	const handleOverlayClick = () => {
		setOpen(false)
	}

	return (
		<>
			<div
				className={clsx(styles.overlay, open && styles.overlayOpen)}
				onClick={handleOverlayClick}
			/>
			<section className={clsx(styles.sidebar, open && styles.sidebarOpen)}>
				<button
					className={clsx(styles.showMenu, open && styles.showMenuOpen)}
					onClick={() => setOpen(!open)}
				>
					<Image
						src={RightArrowIcon}
						alt=''
					/>
				</button>
				<Menu
					items={menuItems}
					hiddenText={!open}
				/>
				<Menu
					items={logoutItems}
					hiddenText={!open}
				/>
			</section>
		</>
	)
}

export default Sidebar
