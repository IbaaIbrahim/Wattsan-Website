'use client'

import Button from '@components/ui/button/Button'
import FormToggle from '@components/ui/inputs/form-toggle/FormToggle'
import { AllowedLangs, LANG_ICONS } from '@constants/allowedLangs'
import userAvatarImage from '@public/img/account/user-avatar.png'
import closeIcon from '@public/img/icons/close.svg'
import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect } from 'react'

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

	const handleOverlayClick = () => onToggle(false)

	useEffect(() => {
		handleOverlayClick()
	}, [pathname])

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
				<Link
					href={PAGES.account}
					className={styles.profile}
				>
					<div className={styles.profilePhoto}>
						<Image
							src={userAvatarImage}
							alt=''
							fill={true}
						/>
					</div>
					<div className={styles.profileName}>Mark Markov</div>
					<div className={styles.profileIcon}>
						<Image
							src={rightArrowIcon}
							alt=''
						/>
					</div>
				</Link>
				<div className={styles.menu}>
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
					{/*<div className={styles.menuTitle}>Contacts</div>*/}
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
