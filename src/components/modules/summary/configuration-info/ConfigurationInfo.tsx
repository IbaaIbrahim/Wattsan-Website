import { MODALS } from '@components/ui/modal/Modal'
import { Typography } from '@components/ui/typography/Typography'
import { FlatConfiguratorSections, SUBSECTIONS_TITLE } from '@constants/configurator'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import _ from 'lodash'

import cn from './ConfigurationInfo.module.scss'

export const ConfigurationInfo = ({
	differentCounter,
	compare,
	yourConfiguration,
	basicConfiguration
}) => {
	// TODO Заменить на актуальный айди машины
	const params = configuratorStore.use.seriesConfigurations()
	const machineId = configuratorStore.use.machineId()

	const handleViewAllSpecification = () => {
		modalsStore.set.open(MODALS.configurationModal, {
			configuration: yourConfiguration,
			params: _.get(params, `${machineId}`)
		})
	}

	const handleViewComparison = () => {
		modalsStore.set.open(MODALS.comparisonModal, {
			basicConfiguration,
			yourConfiguration,
			params: _.get(params, `${machineId}`)
		})
	}

	if (!basicConfiguration.workAreaCharacteristics) return null

	return (
		<div className={cn.wrapper}>
			{compare && (
				<div className={cn.header}>
					<Typography tag='p'>&nbsp;</Typography>
					<Typography
						tag='p'
						size='s'
					>
						Your configuration
					</Typography>
					<Typography
						tag='p'
						size='s'
					>
						Basic
					</Typography>
				</div>
			)}
			{FlatConfiguratorSections.slice(0, 5).map(section => {
				const basicAccessoriesId = basicConfiguration[section]
				const basicInfo = _.get(_.find(_.get(params, `${machineId}.${section}`), ({ characteristicId }) => characteristicId === basicAccessoriesId), 'staticCharacteristic')
				const basicValue = `${_.get(basicInfo, 'name')} ${_.get(basicInfo, 'unit') ?? ''}`

				const yourAccessoriesId = yourConfiguration[section]
				const yourInfo = _.get(_.find(_.get(params, `${machineId}.${section}`), ({ characteristicId }) => characteristicId === yourAccessoriesId), 'staticCharacteristic')
				const yourValue = `${_.get(yourInfo, 'name')} ${_.get(yourInfo, 'unit') ?? ''}`

				return (
					<div
						className={cn.row}
						key={section}
					>
						<Typography
							tag='p'
							size='s'
							weight='regular'
							discolored={true}
						>
							{SUBSECTIONS_TITLE[section]?.name}
						</Typography>
						<Typography
							tag='p'
							size='s'
							weight='regular'
						>
							{compare ? yourValue : yourValue}
						</Typography>
						<Typography
							tag='p'
							size='s'
							weight={!compare ? 'semi-bold' : 'regular'}
							align={compare ? 'left' : 'right'}
						>
							{compare ? basicValue : `$${_.get(yourInfo, 'price')}`}
						</Typography>
					</div>
				)
			})}
			<div className={cn.lastRow}>
				<div></div>
				<div></div>
				<Typography
					tag='p'
					size='s'
					weight='regular'
					discolored={true}
				>
					+{FlatConfiguratorSections.length - 5} more
				</Typography>
			</div>
			<button
				className={cn.all}
				// onClick={compare ? handleViewComparison : handleViewAllSpecification}
				onClick={handleViewAllSpecification}
			>
				<Typography
					tag='p'
					size='s'
				>
					View all specifications
				</Typography>
			</button>
		</div>
	)
}
