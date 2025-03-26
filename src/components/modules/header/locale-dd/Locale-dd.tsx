'use client'

import Tooltip from '@components/ui/tooltip/Tooltip'
import { AllowedLangs, LANG_ICONS } from '@constants/allowedLangs'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import arrow from '@public/img/icons/dd-icon.svg'
import Image from 'next/image'
import { useState } from 'react'

import styles from './Locale.module.scss'

const LocaleDd = () => {
	const {
		lang,
		translations,
		changeLang
	}: {
		lang: AllowedLangs
		translations: ILanguage
		changeLang: (newLanguage: AllowedLangs) => void
	} = useLang()

	const [open, setOpen] = useState(false)

	const handleToggle = () => {
		setOpen(open => !open)
	}

	const handleSelect = (selected: AllowedLangs) => {
		changeLang(selected)
		handleToggle()
	}

	return (
		<Tooltip
			targetClassName={styles.localeMenu}
			opened={open}
			placement='bottom-start'
			offset={[-20, 8]}
			onToggle={setOpen}
			content={
				<ul className={styles['locale-list']}>
					{Object.keys(translations.languages).map((key: string, i: number) => (
						<li
							key={i}
							onClick={() => handleSelect(key as AllowedLangs)}
							className={`${styles['locale-list__item']} ${styles['locale-item']}`}
						>
							<Image
								className={styles['locale-item__img']}
								src={LANG_ICONS[key as AllowedLangs]}
								alt=''
							/>
							{translations.languages[key as AllowedLangs]}
						</li>
					))}
				</ul>
			}
		>
			<button className={styles['localeMenu__btn']}>
				<Image
					className={styles['locale-item__img']}
					src={LANG_ICONS[lang]}
					alt=''
				/>
				<Image
					className={`${styles.arrow} ${open ? styles['arrow--up'] : ''}`}
					src={arrow}
					alt=''
				/>
			</button>
		</Tooltip>
	)
}

export default LocaleDd
