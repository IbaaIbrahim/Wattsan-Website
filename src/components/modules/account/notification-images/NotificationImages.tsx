import Image from 'next/image'
import { FC } from 'react'

import styles from './NotificationImages.module.scss'

const NotificationImages: FC<{ images: string[] }> = ({ images }) => {
	return (
		<div className={styles.wrapper}>
			{images.map((image, index) => (
				<div
					key={index}
					className={styles.image}
				>
					<Image
						src={image}
						alt=''
						fill={true}
					/>
				</div>
			))}
		</div>
	)
}

export default NotificationImages
