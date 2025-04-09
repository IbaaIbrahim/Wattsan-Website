import { configuratorStore } from '@store/configurator'
import {
	getInitialSeriesConfiguration,
	getPersonalConfiguration, getSeriesConfiguration, getSeriesConfigurationForConfigurator,
	getStartParameters
} from '@store/configurator/actions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import _ from 'lodash'
import { requestsStore } from '@store/requests'

export const useConfigurator = () => {
	const searchParams = useSearchParams()

	const machineId = configuratorStore.use.machineId()
	const series = configuratorStore.use.seriesConfigurations()

	const initialize = async () => {
		const categoryId = searchParams.get('categoryId') ?? null

		if (categoryId !== null) {
			configuratorStore.set.categoryId(categoryId)
		}

		const machineId = searchParams.get('machineId') ?? null

		if (categoryId !== null) {
			configuratorStore.set.machineId(machineId)
		}
		const response = await getStartParameters({ categoryId })
		if(response){
			configuratorStore.set.categories(response?.content?.category as any)
			configuratorStore.set.categoryId(response?.content?.category?.[1].id)
			const seriesInfo = response?.content?.series.find(x => x.id == machineId)
			const workAreaInfo = _.first(_.filter(seriesInfo.seriesCharacteristics, x => x.staticCharacteristic.code === 'WorkArea' && x.isAvailable && x.isDefault))
			getSeriesConfigurationForConfigurator(machineId, _.get(workAreaInfo, 'characteristicId'))
			// const seriesItem = _.find(response?.content?.series, x => x.id == machineId)
			// console.log(response, machineId, seriesItem)
			// configuratorStore.set.seriesConfigurations(seriesItem.seriesCharacteristics)
		}
	}

	useEffect(() => {
		initialize()
	}, [])
}
