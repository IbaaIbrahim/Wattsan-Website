import Button from '@components/ui/button/Button'
import FormToggle from '@components/ui/inputs/form-toggle/FormToggle'
import { AllowedLangs, LANG_ICONS } from '@constants/allowedLangs'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import accountImg from '@public/img/icons/account.svg'
import closeIcon from '@public/img/icons/close.svg'
import configImg from '@public/img/icons/config.svg'
import logOutImg from '@public/img/icons/log-out.svg'
import ordersImg from '@public/img/icons/orders.svg'
import persOffersImf from '@public/img/icons/pers-offers.svg'
import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import { authStore } from '@store/auth'
import { logOut } from '@store/auth/actions'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useCallback, useEffect } from 'react'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './MenuSidebar.module.scss'

const MenuSidebar: FC<{
	open: boolean
	lang: AllowedLangs
	changeLang: (newLanguage: AllowedLangs) => void
	options: { text: string; value: string }[]
	onToggle: (show: boolean) => void
}> = ({ open, lang, changeLang, options, onToggle }) => {
	const pathname = usePathname()

	const { translations }: { translations: ILanguage } = useLang()

	const user = authStore.use.user()
	const authorized = authStore.use.authorized()

	const handleOverlayClick = useCallback(() => onToggle(false), [onToggle])

	useEffect(() => {
		handleOverlayClick()
	}, [pathname, handleOverlayClick])

	return (
		<div className={clsx(open && styles.open)}>
			<div
				className={clsx(styles.overlay)}
				onClick={handleOverlayClick}
			/>
			<div className={styles.sidebar}>
				<Button
					className={styles.mobileMenu}
					leftAddon={
						<Image
							src={closeIcon}
							alt=''
						/>
					}
					size='s'
					view='default'
					onClick={() => onToggle(false)}
				>
					Menu
				</Button>
				{authorized && (
					<Link
						href={PAGES.account}
						className={styles.profile}
					>
						<div className={styles.profilePhoto}>
							<Image
								src={accountImg}
								alt=''
								fill={true}
							/>
						</div>
						<div className={styles.profileName}>
							{user.firstName ?? user.userName}
						</div>
						<div className={styles.profileIcon}>
							<Image
								src={rightArrowIcon}
								alt=''
							/>
						</div>
					</Link>
				)}
				<div className={styles.menu}>
					{authorized && (
						<>
							<div className={styles.menuTitle}>Personal</div>
							<Link
								href={PAGES.orders}
								className={clsx(
									styles.menuSubtitle,
									pathname === PAGES.orders && styles.active
								)}
							>
								{translations.header.personal_dd.orders}
							</Link>
							<Link
								href={PAGES.configurations}
								className={clsx(
									styles.menuSubtitle,
									pathname === PAGES.configurations && styles.active
								)}
							>
								{translations.header.personal_dd.configurations}
							</Link>
							<Link
								href={PAGES.offers}
								className={clsx(
									styles.menuSubtitle,
									pathname === PAGES.offers && styles.active
								)}
							>
								{translations.header.personal_dd.pers_offers}
							</Link>
							<div className={styles.divider} />
						</>
					)}
					<div className={styles.menuTitle}>Company</div>
					<div className={styles.menuSubtitle}>Production process</div>
					<div className={styles.menuSubtitle}>Dealership</div>
					<div className={styles.menuSubtitle}>Blog</div>
					<div className={styles.menuTitle}>Support</div>
					<Link
						href={PAGES.support}
						className={styles.menuSubtitle}
					>
						About
					</Link>
					<Link
						href={PAGES.training}
						className={styles.menuSubtitle}
					>
						Training, drivers, and files
					</Link>
					<Link
						href={PAGES.faq}
						className={styles.menuSubtitle}
					>
						FAQ
					</Link>
					<Link
						href={PAGES.checkEquipment}
						className={styles.menuTitle}
					>
						Check equipment
					</Link>
					{authorized && (
						<>
							<div className={styles.divider} />
							<div
								className={styles.logout}
								onClick={logOut}
							>
								<Image
									src={logOutImg}
									alt=''
								/>
								{translations.header.personal_dd.log_out}
							</div>
						</>
					)}
				</div>
				<FormToggle
					value={lang}
					content={options.map(option => ({
						value: option.value,
						content: (
							<>
								<Image
									src={LANG_ICONS[option.value]}
									alt=''
								/>
								{option.text}
							</>
						)
					}))}
					onChange={changeLang}
				/>
			</div>
		</div>
	)
}

export default MenuSidebar
