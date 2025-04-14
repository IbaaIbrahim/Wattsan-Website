import FormToggle from '@components/ui/inputs/form-toggle/FormToggle'
import { AllowedLangs, LANG_ICONS } from '@constants/allowedLangs'
import accountIcon from '@public/img/icons/account.svg'
import basketIcon from '@public/img/icons/basket.svg'
import comparisonIcon from '@public/img/icons/comparison.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect } from 'react'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './ConfiguratorMenu.module.scss'

const ConfiguratorMenu: FC<{
	open: boolean
	lang: AllowedLangs
	changeLang: (newLanguage: AllowedLangs) => void
	options: { text: string; value: string }[]
	onToggle: (show: boolean) => void
}> = ({ open, lang, changeLang, options, onToggle }) => {
	const pathname = usePathname()

	useEffect(() => {
		onToggle(false)
	}, [pathname])

	return (
		<div className={clsx(open && styles.open)}>
			<div
				className={styles.overlay}
				onClick={() => onToggle(false)}
			/>
			<div className={styles.wrapper}>
				<div className={styles.menu}>
					<Link
						href={PAGES.basket}
						className={styles.button}
					>
						<Image
							className={styles.icon}
							src={basketIcon}
							alt=''
						/>
						Basket
					</Link>
					{/*<Link*/}
					{/*	href={PAGES.comparison}*/}
					{/*	className={styles.button}*/}
					{/*>*/}
					{/*	<Image*/}
					{/*		className={styles.icon}*/}
					{/*		src={comparisonIcon}*/}
					{/*		alt=''*/}
					{/*	/>*/}
					{/*	Comparison*/}
					{/*</Link>*/}
					{/*<Link*/}
					{/*	href={PAGES.favorites}*/}
					{/*	className={styles.button}*/}
					{/*>*/}
					{/*	<Image*/}
					{/*		className={styles.icon}*/}
					{/*		src={favoritesIcon}*/}
					{/*		alt=''*/}
					{/*	/>*/}
					{/*	Favorites*/}
					{/*</Link>*/}
					<Link
						href={PAGES.account}
						className={styles.button}
					>
						<Image
							className={styles.icon}
							src={accountIcon}
							alt=''
						/>
						Account
					</Link>
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

export default ConfiguratorMenu
