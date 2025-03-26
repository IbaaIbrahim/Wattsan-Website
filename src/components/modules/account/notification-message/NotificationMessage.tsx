import Image from 'next/image'
import { FC, ReactNode } from 'react'

import styles from './NotificationMessage.module.scss'

const NotificationMessage: FC<{
	icon: string
	title: string
	message: ReactNode
	date: string
}> = ({ icon, title, message, date }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.icon}>
					<Image
						src={icon}
						fill={true}
						alt=''
					/>
				</div>
				{title}
			</div>
			<div className={styles.content}>{message}</div>
			<div className={styles.date}>{date}</div>
		</div>
	)
}

export default NotificationMessage
