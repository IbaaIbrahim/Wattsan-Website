import Image from 'next/image'
import { FC, ReactNode } from 'react'

import styles from './ConfigurationTemplatePlate.module.scss'

const ConfigurationTemplatePlate: FC<{
	item: { image: string; name: string; code: string; price: string }
	children?: ReactNode
}> = ({ item, children }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={item.image}
					fill={true}
					alt=''
				/>
			</div>
			<div>
				<div className={styles.name}>{item.name}</div>
				<div className={styles.code}>{item.code}</div>
				<div className={styles.price}>{item.price}</div>
			</div>
			{children}
		</div>
	)
}

export default ConfigurationTemplatePlate
