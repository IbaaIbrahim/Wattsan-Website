import Button from '@components/ui/button/Button'
import { IEquipment } from '@my-types/equipment'
import Image from 'next/image'
import { FC } from 'react'

import styles from './EquipmentInfo.module.scss'

const EquipmentInfo: FC<{ equipment: IEquipment }> = ({ equipment }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>{equipment.name}</div>
			<div className={styles.code}>
				{equipment.code}&nbsp;
				<div className={styles.status}>{equipment.status}</div>
			</div>
			<div className={styles.image}>
				<Image
					src={equipment.image}
					fill={true}
					alt=''
				/>
			</div>
			<div className={styles.serialTitle}>Serial number</div>
			<div className={styles.serialNumber}>{equipment.serialNumber}</div>
			<Button
				className={styles.action}
				view='black'
				size='l'
				href={`/equipment/${equipment.id}`}
			>
				View details
			</Button>
		</div>
	)
}

export default EquipmentInfo
