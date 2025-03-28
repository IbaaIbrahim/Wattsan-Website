import clsx from 'clsx'
import { FC } from 'react'

import styles from './Status.module.scss'

const Status: FC<{
	text: string | number
	view?: 'default' | 'yellow' | 'green' | 'purple' | 'red'
	size?: 'l' | 'm'
	counter?: string | undefined
	counterView?: 'default' | 'yellow' | 'green' | 'purple' | 'red'
}> = ({
	text,
	view = 'default',
	size = 'm',
	counter,
	counterView = 'default'
}) => {
	return (
		<div className={clsx(styles.status, styles[view], styles[size])}>
			{text}
			{counter && (
				<span className={clsx(styles.counter, styles[counterView])}>
					{counter}
				</span>
			)}
		</div>
	)
}

export default Status
