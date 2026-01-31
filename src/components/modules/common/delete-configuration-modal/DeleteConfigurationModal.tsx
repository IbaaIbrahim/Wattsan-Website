import ConfigurationTemplatePlate from '@components/modules/common/configuration-template-plate/ConfigurationTemplatePlate'
import { FC } from 'react'

import styles from './DeleteConfigurationModal.module.scss'

const DeleteConfigurationModal: FC<{
	image: string
	name: string
	code: string
	price: string
}> = ({ image, name, price, code }) => {
	return (
		<div>
			<div className={styles.title}>
				Do you really want to delete this configuration?
			</div>
			<div className={styles.description}>
				If you change your mind, your configuration won't be permanently erased
				but moved to the 'Deleted' section, allowing you to restore it if
				needed.
			</div>
			<ConfigurationTemplatePlate item={{ image, name, code, price }} />
		</div>
	)
}

export default DeleteConfigurationModal
