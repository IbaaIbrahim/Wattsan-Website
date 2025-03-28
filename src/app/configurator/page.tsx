'use client'

import Equipment from '@components/modules/machine-grid/equipment/Equipment'
import Machines from '@components/modules/machine-grid/machines/Machines'
import { PageLoader } from '@components/modules/page-loader'
import { useConfigurator } from '@hooks/use-configurator'
import { requestsStore } from '@store/requests'

import styles from './page.module.scss'

const ConfiguratorPage = () => {
	console.log('123')
	useConfigurator()

	const loading = requestsStore.use.multipleLoadingSelector([
		'getStartParametersByCategory',
		'getStartParameters'
	])

	const notInitialized = requestsStore.use.multipleIdleSelector([
		'getStartParametersByCategory',
		'getStartParameters'
	])

	return (
		<div className={styles.container}>
			<Equipment />
			<Machines />
			<PageLoader visible={loading || notInitialized} />
		</div>
	)
}

export default ConfiguratorPage
