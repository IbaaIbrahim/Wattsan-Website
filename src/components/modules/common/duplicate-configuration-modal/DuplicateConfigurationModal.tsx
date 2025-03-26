import ConfigurationTemplatePlate from '@components/modules/common/configuration-template-plate/ConfigurationTemplatePlate'
import { FC } from 'react'

import styles from './DuplicateConfigurationModal.module.scss'

const DuplicateConfigurationModal: FC<{
	image: string
	name: string
	code: string
	price: string
}> = ({ image, name, price, code }) => {
	return (
		<>
			<div className={styles.title}>Duplicate this configuration?</div>
			<ConfigurationTemplatePlate item={{ image, name, code, price }} />
		</>
	)
}

export default DuplicateConfigurationModal
