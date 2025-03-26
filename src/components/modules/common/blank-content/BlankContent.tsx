import Button from '@components/ui/button/Button'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

import styles from './BlankContent.module.scss'

const BlankContent: FC<{
	image: string
	title: ReactNode
	description: ReactNode
	action?: string
	onClick?: () => void
}> = ({ image, title, description, action, onClick }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={image}
					alt=''
					fill={true}
				/>
			</div>
			<div>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
				{action && (
					<Button
						className={styles.action}
						view='red'
						size='l'
						onClick={onClick}
					>
						{action}
					</Button>
				)}
			</div>
		</div>
	)
}

export default BlankContent
