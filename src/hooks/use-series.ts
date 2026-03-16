import { configuratorStore } from '@store/configurator'
import {
	getInitialSeriesConfiguration,
	getPersonalConfiguration,
	getStartParameters
} from '@store/configurator/actions'
// import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { authStore } from '@store/auth'

export const useSeries = () => {
	// const pathname = usePathname()
	// const searchParams = useSearchParams()
	const clientId = authStore.useStore((state) => state.clientId)


	const categoryId = configuratorStore.use.categoryId()

	useEffect(() => {
		getStartParameters({ init: true })
	}, [clientId])

	useEffect(() => {
		if (categoryId !== null) {
			getStartParameters({ categoryId })
		}
	}, [categoryId])
}
