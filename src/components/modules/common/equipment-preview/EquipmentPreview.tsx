import Image from 'next/image'
import { FC } from 'react'

import styles from './EquipmentPreview.module.scss'

const EquipmentPreview: FC<{
	total: number
	show?: number
	combinedPreview?: boolean
	items: string[]
}> = ({ total, show = 0, combinedPreview = false, items = [] }) => {
	return (
		<div className={styles.wrapper}>
			{show > 0 &&
				!combinedPreview &&
				items.slice(0, show).map((src, index) => (
					<div
						key={index}
						className={styles.image}
					>
						<Image
							src={src}
							fill={true}
							alt=''
						/>
					</div>
				))}
			{combinedPreview && (
				<div className={styles.combined}>
					<Image
						src={items?.[0]}
						fill={true}
						alt=''
					/>
				</div>
			)}
			<div className={styles.total}>+{total}</div>
		</div>
	)
}

export default EquipmentPreview
