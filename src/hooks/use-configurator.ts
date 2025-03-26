import { configuratorStore } from '@store/configurator'
import {
	getInitialSeriesConfiguration,
	getPersonalConfiguration,
	getStartParameters
} from '@store/configurator/actions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useConfigurator = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const categoryId = configuratorStore.use.categoryId()
	const machineId = configuratorStore.use.machineId()
	const series = configuratorStore.use.seriesConfigurations()

	const initialize = async () => {
		await getStartParameters({ init: true })

		const categoryId = searchParams.get('categoryId') ?? null

		if (categoryId !== null) {
			configuratorStore.set.categoryId(categoryId)
		}

		const machineId = searchParams.get('machineId') ?? null

		if (categoryId !== null) {
			configuratorStore.set.machineId(machineId)
		}

		if (pathname.includes('summary')) {
			// TODO Добавить обработку
			await getPersonalConfiguration()
		}
	}

	useEffect(() => {
		initialize()
	}, [pathname])

	useEffect(() => {
		if (categoryId !== null) {
			getStartParameters({ categoryId })
		}
	}, [categoryId])

	/** Запрос настроек для конфигуратора оборудования */
	useEffect(() => {
		if (machineId !== null && Object.values(series).length === 0) {
			getInitialSeriesConfiguration(machineId)
		}
	}, [machineId, series])
}
