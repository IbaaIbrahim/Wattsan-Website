'use client'

import Equipment from '@components/modules/machine-grid/equipment/Equipment'
import Machines from '@components/modules/machine-grid/machines/Machines'
import { useConfigurator } from '@hooks/use-configurator'

import styles from './page.module.scss'

const ConfiguratorPage = () => {
	useConfigurator()

	return (
		<div className={styles.container}>
			<Equipment />
			<Machines />
		</div>
	)
}

export default ConfiguratorPage
