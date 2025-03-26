'use client'

import GridWrapper from '@components/ui/grid-template/GridWrapper'
import { configuratorStore } from '@store/configurator'

import MachinesItem from '../machine-item/MachinesItem'

const GridContent = () => {
	const categoryId = configuratorStore.use.categoryId()
	const machines = configuratorStore.use.seriesSelector(categoryId)

	return (
		<GridWrapper>
			{machines.map(machine => (
				<MachinesItem
					key={machine.id}
					category={categoryId}
					machineData={machine}
				/>
			))}
		</GridWrapper>
	)
}

export default GridContent
