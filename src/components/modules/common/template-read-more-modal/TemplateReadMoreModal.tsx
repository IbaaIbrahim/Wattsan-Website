import ConfigurationTemplatePlate from '@components/modules/common/configuration-template-plate/ConfigurationTemplatePlate'
import Button from '@components/ui/button/Button'
import { FC } from 'react'

import styles from './TemplateReadMoreModal.module.scss'

const TemplateReadMoreModal: FC<{
	title: string
	image: string
	content: string
	name: string
	code: string
	price: string
	id: string
}> = ({ title, id, image, name, price, code, content }) => {
	return (
		<>
			<div className={styles.subtitle}>About template</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{content}</div>
			<ConfigurationTemplatePlate item={{ image, name, code, price }}>
				<Button
					size='l'
					view='bordered'
					// TODO Добавить актуальную ссылку
					href={`/${id}`}
				>
					View item
				</Button>
			</ConfigurationTemplatePlate>
		</>
	)
}

export default TemplateReadMoreModal
