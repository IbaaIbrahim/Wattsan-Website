import Image from 'next/image'
import { FC } from 'react'

import styles from './IconBadge.module.scss'

const IconBadge: FC<{ badge: number; icon: string }> = ({ badge, icon }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.badge}>{badge}</div>
			<Image
				src={icon}
				alt=''
			/>
		</div>
	)
}

export default IconBadge
