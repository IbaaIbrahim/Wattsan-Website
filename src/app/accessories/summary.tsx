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

import cn from './summary.module.scss'
import { useSummary } from '@hooks/use-summary'
const Summary = ({setIsSummary}) => {

	return (
		<div className={cn.page}>
			<SummaryView setIsSummary={setIsSummary} />
			<SummaryAbout />
		</div>
	)
}

export default Summary
