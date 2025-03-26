'use client'

import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './SupportPlate.module.scss'

const STATUS_MAP = {
	'In process': 'yellow',
	Completed: 'green'
}

const SupportPlate: FC<{
	request: {
		theme: string
		id: string
		createDate: string
		status: string
		message: string
	}
}> = ({ request }) => {
	const [folded, setFolded] = useState<boolean>(true)

	return (
		<div className={styles.wrapper}>
			<button
				className={styles.header}
				onClick={() => setFolded(!folded)}
			>
				<div className={styles.headerContent}>
					<div className={styles.theme}>{request.theme}</div>
					<div className={styles.id}>№&nbsp;{request.id}</div>
					<div className={styles.createDate}>{request.createDate}</div>
					<div
						className={clsx(styles.status, styles[STATUS_MAP[request.status]])}
					>
						{request.status}
					</div>
					<Image
						className={clsx(styles.icon, folded && styles.iconFolded)}
						src={rightArrowIcon}
						alt=''
					/>
				</div>
				<div className={clsx(styles.divider, folded && styles.dividerFolded)} />
			</button>
			<div className={clsx(styles.content, folded && styles.folded)}>
				<div className={styles.innerContent}>
					<div className={styles.contentTitle}>Your message</div>
					<div className={styles.message}>{request.message}</div>
					<div className={styles.info}>
						We will answer you from our official support email
						support@wattsan.com
					</div>
				</div>
			</div>
		</div>
	)
}

export default SupportPlate
