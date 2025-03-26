import EquipmentInfo from '@components/modules/equipment/equipment-info/EquipmentInfo'
import Button from '@components/ui/button/Button'
import { IEquipmentInfo } from '@my-types/equipment'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './EquipmentInfoPage.module.scss'

const EquipmentInfoPage: FC<{ info: IEquipmentInfo }> = ({ info }) => {
	return (
		<>
			<Button
				className={styles.navigation}
				href='/equipment'
				view='default'
				leftAddon={
					<Image
						src={arrowSrc}
						alt=''
					/>
				}
			>
				Back to My equipment
			</Button>
			<div className={styles.title}>Equipment info</div>
			<EquipmentInfo info={info} />
		</>
	)
}

export default EquipmentInfoPage
