'use client'

import { PageLoader } from '@components/modules/page-loader'
import SummaryAbout from '@components/modules/summary/summary-about/SummaryAbout'
import SummaryView from '@components/modules/summary/summary-view/SummaryView'
import {
	API_CONFIGURATION_BY_SERIES,
	API_CONFIGURATION_BY_SERIES_AND_MODEL
} from '@constants/api'
import { useConfigurator } from '@hooks/use-configurator'
import { requestsStore } from '@store/requests'

import cn from './page.module.scss'

const REQUESTS = [
	'getStartParametersByCategory',
	'getStartParameters',
	API_CONFIGURATION_BY_SERIES,
	API_CONFIGURATION_BY_SERIES_AND_MODEL
]

const Summary = () => {
	useConfigurator()

	const loading = requestsStore.use.multipleLoadingSelector(REQUESTS)

	const notInitialized = requestsStore.use.multipleIdleSelector(REQUESTS)

	return (
		<div className={cn.page}>
			<SummaryView />
			<SummaryAbout />
			<PageLoader visible={loading || notInitialized} />
		</div>
	)
}

export default Summary
