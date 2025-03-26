'use client'

import SummaryAbout from '@components/modules/summary/summary-about/SummaryAbout'
import SummaryView from '@components/modules/summary/summary-view/SummaryView'
import { useConfigurator } from '@hooks/use-configurator'

import cn from './page.module.scss'

const Summary = () => {
	useConfigurator()

	return (
		<div className={cn.page}>
			<SummaryView />
			<SummaryAbout />
		</div>
	)
}

export default Summary
