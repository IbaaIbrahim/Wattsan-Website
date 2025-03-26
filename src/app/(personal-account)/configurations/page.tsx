import ConfigurationsView from '@components/modules/account/configurations-view/ConfigurationsView'
import { configurationsService } from '@services/configurations.service'

const ConfigurationsPage = async () => {
	const configurations = await configurationsService.getConfigurations()

	return (
		<>
			<ConfigurationsView configurations={configurations} />
		</>
	)
}

export default ConfigurationsPage
