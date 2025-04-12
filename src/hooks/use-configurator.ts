import { authStore } from '@store/auth';
import { configuratorStore } from '@store/configurator';
import { getConfiguratorById, getInitialSeriesConfiguration, getPersonalConfiguration, getSeriesConfiguration, getSeriesConfigurationForConfigurator, getStartParameters } from '@store/configurator/actions';
import { requestsStore } from '@store/requests';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


export const useConfigurator = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const clientId = authStore.useStore((state) => state.clientId)

	const setUrlParamSilently = (key: string, value: string) => {
		const url = new URL(window.location.href)
		url.searchParams.set(key, value)

		window.history.replaceState({}, '', url.toString())
	}

	const initialize = async () => {

		let categoryId = searchParams.get('categoryId') ?? null

		let machineId = searchParams.get('machineId') ?? null

		let workAreaId = null

		if (categoryId !== null) {
			configuratorStore.set.categoryId(categoryId)
		}

		if (machineId !== null) {
			configuratorStore.set.machineId(machineId)
		}

		const configuratorId = searchParams.get('configuratorId') ?? null

		if (configuratorId !== null) {
			if (clientId) {
				configuratorStore.set.configuratorId(configuratorId)
				const configurator = await getConfiguratorById(configuratorId)
				if((!categoryId && !machineId) || (`${categoryId}` != `${_.get(configurator, 'series.categoryId')}` || `${machineId}` != `${_.get(configurator, 'seriesId')}`)){
					categoryId = _.get(configurator, 'series.categoryId')
					machineId = _.get(configurator, 'seriesId')
					workAreaId = _.get(configurator, 'workArea')
					setUrlParamSilently('categoryId', categoryId)
					setUrlParamSilently('machineId', machineId)
					window.location.reload()
					return
				}
			} else {
				return
			}
		}

		const response = await getStartParameters({ categoryId })
		if(response){
			configuratorStore.set.categories(response?.content?.category as any)
			configuratorStore.set.categoryId(response?.content?.category?.[1].id)
			const seriesInfo = response?.content?.series.find(x => x.id == machineId)
			const workAreaInfo = _.first(_.filter(seriesInfo.seriesCharacteristics, x => x.staticCharacteristic.code === 'WorkArea' && x.isAvailable && x.isDefault))
			getSeriesConfigurationForConfigurator(machineId, workAreaId ?? _.get(workAreaInfo, 'characteristicId'), configuratorId)
			// const seriesItem = _.find(response?.content?.series, x => x.id == machineId)
			// console.log(response, machineId, seriesItem)
			// configuratorStore.set.seriesConfigurations(seriesItem.seriesCharacteristics)
		}
	}

	useEffect(() => {
		initialize()
	}, [clientId])
}