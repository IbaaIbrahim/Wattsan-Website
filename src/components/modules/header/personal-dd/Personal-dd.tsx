'use client'

import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import Tooltip from '@components/ui/tooltip/Tooltip'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import accountImg from '@public/img/icons/account.svg'
import closeIcon from '@public/img/icons/close.svg'
import configImg from '@public/img/icons/config.svg'
import configuratorMenuIcon from '@public/img/icons/configurator-menu.svg'
import dashImg from '@public/img/icons/dash.svg'
import arrow from '@public/img/icons/dd-icon.svg'
import equipImg from '@public/img/icons/equipment.svg'
import logOutImg from '@public/img/icons/log-out.svg'
import mobileMenuIcon from '@public/img/icons/mobile-menu.svg'
import notifImg from '@public/img/icons/notification.svg'
import ordersImg from '@public/img/icons/orders.svg'
import persOffersImf from '@public/img/icons/pers-offers.svg'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './Personal.module.scss'
import { logOut } from '@store/auth/actions'

const PersonalDd: FC<{
	configuratorMenuOpen: boolean
	onOpenMenu: () => void
}> = ({ configuratorMenuOpen, onOpenMenu }) => {
	const pathname = usePathname()

	const { translations }: { translations: ILanguage } = useLang()

	const [open, setOpen] = useState(false)

	const user = authStore.use.user()

	const authorized = authStore.use.authorized()

	return (
		<article className={styles['personal-menu']}>
			{authorized ? (
				<Tooltip
					placement='bottom-end'
					onToggle={setOpen}
					content={
						<div className={styles['dd-content']}>
							<span className={styles['dd-content__fullname']}>
								<span className={styles['user-fullname']}>{user.firstName ?? user.userName}</span>
								<Image
									className={styles['notifications-icon']}
									src={notifImg}
									alt=''
								/>
							</span>
							<div className={styles['dd-content__links']}>
								{/* <Link
									className={clsx(
										styles.link,
										pathname === PAGES.dashboard && styles.active
									)}
									href={PAGES.dashboard}
								>
									<Image
										className={styles.icon}
										src={dashImg}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.dashboard}
									</div>
								</Link> */}
								<Link
									className={clsx(
										styles.link,
										pathname === PAGES.orders && styles.active
									)}
									href={PAGES.orders}
								>
									<Image
										className={styles.icon}
										src={ordersImg}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.orders}
									</div>
								</Link>
								<Link
									className={clsx(
										styles.link,
										pathname === PAGES.configurations && styles.active
									)}
									href={PAGES.configurations}
								>
									<Image
										className={styles.icon}
										src={configImg}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.configurations}
									</div>
								</Link>
								{/* <Link
									className={clsx(
										styles.link,
										pathname === PAGES.equipment && styles.active
									)}
									href={PAGES.equipment}
								>
									<Image
										className={styles.icon}
										src={equipImg}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.my_equipment}
									</div>
								</Link> */}
								<Link
									className={clsx(
										styles.link,
										pathname === PAGES.offers && styles.active
									)}
									href={PAGES.offers}
								>
									<Image
										className={styles.icon}
										src={persOffersImf}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.pers_offers}
									</div>
								</Link>
								<Link
									className={clsx(
										styles.link,
										pathname === PAGES.account && styles.active
									)}
									href={PAGES.account}
								>
									<Image
										className={styles.icon}
										src={accountImg}
										alt=''
									/>
									<div className={styles.text}>
										{translations.header.personal_dd.account}
									</div>
								</Link>
							</div>
							<span className={styles['dd-content__logout']} onClick={logOut}>
								<Image
									className={styles['dd-link__icon']}
									src={logOutImg}
									alt=''
								/>
								<span className={styles['dd-link__label']}>
									{translations.header.personal_dd.log_out}
								</span>
							</span>
						</div>
					}
				>
					<Button
						className={styles.accountButton}
						size='s'
						view='blue'
						rightAddon={
							<div className={clsx(styles.arrow, open && styles.arrowUp)}>
								<Image
									src={arrow}
									alt=''
								/>
							</div>
						}
					>
						{user.firstName ?? user.userName}
					</Button>
				</Tooltip>
			) : (
				<Button
					className={styles.accountButton}
					view='blue'
					size='s'
					onClick={() =>
						modalsStore.set.open(MODALS.login, {
							initialScreen: 'SIGN_UP',
							closeOnEscape: false,
							onComplete: ({ type }) => {
								if (type === 'register') {
									modalsStore.set.open(MODALS.registerSuccessModal, {
										styles: {display: 'block'}
									})
								} else {
									modalsStore.set.close()
								}
							}
						})
					}
				>
					Login
				</Button>
			)}
			{authorized ? (
				<Button
					className={clsx(styles.mobileMenu)}
					leftAddon={
						<Image
							src={
								pathname === '/configurator' || pathname === '/summary'
									? configuratorMenuOpen
										? closeIcon
										: configuratorMenuIcon
									: mobileMenuIcon
							}
							alt=''
						/>
					}
					size='s'
					view='default'
					withoutContent={!['summary', 'configurator'].includes(pathname)}
					onClick={onOpenMenu}
				>
					{['summary', 'configurator'].includes(pathname) && 'Menu'}
				</Button>
			) : (
				<Button
					className={styles.mobileMenu}
					view='blue'
					size='s'
					onClick={() =>
						modalsStore.set.open(MODALS.login, {
							initialScreen: 'SIGN_UP',
							closeOnEscape: false,
							onComplete: ({ type }) => {
								if (type === 'register') {
									modalsStore.set.open(MODALS.registerSuccessModal, {
										styles: {display: 'block'}
									})
								} else {
									modalsStore.set.close()
								}
							}
						})
					}
				>
					Login
				</Button>
			)}
		</article>
	)
}

export default PersonalDd
