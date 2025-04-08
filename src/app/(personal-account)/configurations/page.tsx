'use client'

import ConfigurationsView from '@components/modules/account/configurations-view/ConfigurationsView'
import { configurationsService } from '@services/configurations.service'
import { useEffect, useState } from 'react'
import { authStore } from '@store/auth'
import { Loader } from '@components/modules/page-loader/components/loader'

const ConfigurationsPage = () => {
	const [configurations, setConfigurations] = useState({configurations: [],
		myTemplates: [],
		popularTemplates: [],
		basicSpecification: {}})
	const clientId = authStore.useStore((state) => state.clientId)
	const [loadingApi, setLoadingApi] = useState(true)

	useEffect(() => {
		console.log(clientId)
		if(clientId) {
			configurationsService.getConfigurations(clientId).then(data => {
				setConfigurations(data)
				setLoadingApi(false)
			})
		}
	}, [clientId])

	if (loadingApi) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Loader size={40} />
			</div>
		)
	}

	return (
		<>
			<ConfigurationsView configurations={configurations} />
		</>
	)
}

export default ConfigurationsPage
