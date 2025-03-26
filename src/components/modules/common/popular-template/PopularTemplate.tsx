import Button from '@components/ui/button/Button'
import { IPopularTemplate } from '@my-types/configurations'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PopularTemplate.module.scss'

const PopularTemplate: FC<{
	template: IPopularTemplate
	onEdit: () => void
	onReadMore: () => void
}> = ({ template, onEdit, onReadMore }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={template.image}
					fill={true}
					alt=''
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.tags}>
					{template.tags.map(tag => (
						<div
							key={tag}
							className={styles.tag}
						>
							{tag}
						</div>
					))}
				</div>
				<div className={styles.name}>{template.name}</div>
				<div className={styles.code}>
					{template.code}&nbsp;
					<div className={styles.specialization}>{template.specialization}</div>
				</div>
				<Button
					className={styles.startEditing}
					size='l'
					view='black'
					onClick={onEdit}
				>
					Start editing
				</Button>
			</div>
			<div className={styles.recommendation}>
				<div className={styles.recommendationTitle}>Perfect for</div>
				<div className={styles.recommendationContent}>
					{template.description.preview}
				</div>
				<Button
					className={styles.recommendationButton}
					size='s'
					view='bordered'
					onClick={onReadMore}
				>
					Read more
				</Button>
			</div>
		</div>
	)
}

export default PopularTemplate
