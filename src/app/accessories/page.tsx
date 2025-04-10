'use client'
import { useState } from 'react'
import Accessories from '@/accessories/accessories'
import Summary from '@/accessories/summary'
import { useConfigurator } from '@hooks/use-configurator'

const MachineId = () => {
	const [isSummary, setIsSummary] = useState(false)
	useConfigurator()

	if(isSummary) {
		return (
			<Summary setIsSummary={setIsSummary} />
		)
	} else {
		return (
			<Accessories setIsSummary={setIsSummary} />
		)
	}
}

export default MachineId
