'use client'

import Tooltip from '@components/ui/tooltip/Tooltip'
import { AllowedLangs, LANG_ICONS } from '@constants/allowedLangs'
import { PHONE_CODES } from '@constants/phoneCodes'
import { useLang } from '@hooks/useLang'
import arrow from '@public/img/icons/dd-icon.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './PhoneCodes.module.scss'

const PhoneCodes = ({ selectCode }: { selectCode: (code: string) => void }) => {
	const [open, setOpen] = useState(false)

	const { lang } = useLang()

	const [selectedCode, setSelectedCode] = useState<AllowedLangs>(lang)

	useEffect(() => {
		selectCode(PHONE_CODES[selectedCode as AllowedLangs])
	}, [selectedCode])

	const handleSelect = (selected: AllowedLangs) => {
		setSelectedCode(selected)
		setOpen(false)
	}

	return (
		<Tooltip
			opened={open}
			placement='bottom-start'
			targetClassName={styles['codes-menu']}
			onToggle={setOpen}
			content={
				<ul className={styles['codes-list']}>
					{Object.keys(PHONE_CODES).map((key: string, i: number) => (
						<li
							key={i}
							onClick={() => handleSelect(key as AllowedLangs)}
							className={`${styles['codes-list__item']} ${styles['codes-item']}`}
						>
							<Image
								className={styles['codes-item__img']}
								src={LANG_ICONS[key as AllowedLangs]}
								alt=''
							/>
							{PHONE_CODES[key as AllowedLangs]}
						</li>
					))}
				</ul>
			}
		>
			<button className={styles['codes-menu__btn']}>
				<Image
					className={styles['codes-item__img']}
					src={LANG_ICONS[selectedCode as AllowedLangs]}
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

export default PhoneCodes
