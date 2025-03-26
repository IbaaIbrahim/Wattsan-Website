import closeIcon from '@public/img/icons/close.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import styles from './SessionPlate.module.scss'

const STATUS_COLOR_MAP = {
	Active: 'yellow',
	Inactive: 'red'
}

const SessionPlate: FC<{
	session: {
		id: string
		name: string
		place: string
		ip: string
		status: string
	}
	onClose: (id: string) => void
}> = ({ session, onClose }) => {
	return (
		<div
			className={clsx(
				styles.plate,
				session.status === 'Inactive' && styles.inactive
			)}
		>
			<div className={styles.name}>{session.name}</div>
			<div className={styles.place}>{session.place}</div>
			<div className={styles.ip}>{session.ip}</div>
			<div
				className={clsx(
					styles.status,
					styles[STATUS_COLOR_MAP[session.status]]
				)}
			>
				{session.status}
			</div>
			<button
				className={styles.close}
				onClick={() => onClose(session.id)}
			>
				<Image
					src={closeIcon}
					alt=''
				/>
			</button>
		</div>
	)
}

export default SessionPlate
