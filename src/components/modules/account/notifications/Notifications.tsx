import NotificationMessage from '@components/modules/account/notification-message/NotificationMessage'
import Button from '@components/ui/button/Button'
import Tags from '@components/ui/tags/Tags'
import bellIcon from '@public/img/icons/bell.svg'
import closeIcon from '@public/img/icons/close.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

import styles from './Notifications.module.scss'

const Notifications: FC<{
	show: boolean
	selectedFilter: string[]
	filters: { content: string; id: string }[]
	notifications: {
		id: string
		icon: string
		title: string
		message: ReactNode
		date: string
	}[]
	onChange: (id: string) => void
	onClose: () => void
}> = ({ show, filters, selectedFilter, notifications, onChange, onClose }) => {
	return (
		<section className={clsx(styles.wrapper, show && styles.wrapperOpen)}>
			<div className={styles.header}>
				<h4 className={styles.title}>
					<Image
						src={bellIcon}
						alt=''
					/>
					Notifications
				</h4>
				<Button
					className={styles.closeButton}
					view='default'
					size='s'
					onClick={onClose}
				>
					<Image
						src={closeIcon}
						alt=''
					/>
				</Button>
			</div>
			<Tags
				items={filters}
				selected={selectedFilter}
				onClick={onChange}
			/>
			<div className={styles.messages}>
				{notifications.map(({ title, id, message, date, icon }) => (
					<NotificationMessage
						icon={icon}
						key={id}
						message={message}
						date={date}
						title={title}
					/>
				))}
			</div>
		</section>
	)
}

export default Notifications
