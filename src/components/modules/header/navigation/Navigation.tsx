'use client'

import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import basket from '@public/img/icons/basket.svg'
import comparison from '@public/img/icons/comparison.svg'
import favorites from '@public/img/icons/favorites.svg'
import Image from 'next/image'
import Link from 'next/link'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './Navigation.module.scss'

const Navigation = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<Link
				href={PAGES.comparison}
				className={styles.link}
			>
				<div className={styles.icon}>
					<Image
						src={comparison}
						alt=''
					/>
				</div>
				<div className={styles.text}>
					{translations.header.navigation.comparision}
				</div>
			</Link>
			<Link
				href={PAGES.favorites}
				className={styles.link}
			>
				<div className={styles.icon}>
					<Image
						src={favorites}
						alt=''
					/>
				</div>
				<div className={styles.text}>
					{translations.header.navigation.favorites}
				</div>
			</Link>
			<Link
				href={PAGES.basket}
				className={styles.link}
			>
				<div className={styles.icon}>
					<Image
						src={basket}
						alt=''
					/>
				</div>
				<div className={styles.text}>
					{translations.header.navigation.basket}
				</div>
			</Link>
		</div>
	)
}

export default Navigation
