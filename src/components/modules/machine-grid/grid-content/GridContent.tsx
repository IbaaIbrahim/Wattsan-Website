'use client'

import _ from 'lodash'

import GridWrapper from '@components/ui/grid-template/GridWrapper'
import { configuratorStore } from '@store/configurator'

import MachinesItem from '../machine-item/MachinesItem'
import { equipmentFiltersForm } from '@store/forms'

const GridContent = () => {
	const categoryId = configuratorStore.use.categoryId()
	const machines = configuratorStore.use.seriesSelector(categoryId)
	const { workAreaFilter } = equipmentFiltersForm.use.valuesSelector()



	const filteredMachines = machines.filter(machineData => {
		const ss = machineData?.seriesCharacteristics?.filter?.(
			({ code, isAvailable, isDefault, staticCharacteristic }: any) => {
				let cond = true
				if(_.isObject(workAreaFilter) && !workAreaFilter.includes('all')){
					cond = workAreaFilter.includes(staticCharacteristic.id)
				}
				return code === 'WorkArea' && isAvailable && isDefault && cond
			}
		)
		return ss.length > 0
	})

	return (
		<GridWrapper>
			{filteredMachines.map(machine => (
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
