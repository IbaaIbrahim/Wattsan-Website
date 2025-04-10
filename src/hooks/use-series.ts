import { configuratorStore } from '@store/configurator'
import {
	getInitialSeriesConfiguration,
	getPersonalConfiguration,
	getStartParameters
} from '@store/configurator/actions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useSeries = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const categoryId = configuratorStore.use.categoryId()

	useEffect(() => {
		getStartParameters({ init: true })
	}, [])

	useEffect(() => {
		if (categoryId !== null) {
			getStartParameters({ categoryId })
		}
	}, [categoryId])
}
