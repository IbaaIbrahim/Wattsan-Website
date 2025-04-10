import { MODALS } from '@components/ui/modal/Modal'
import { Typography } from '@components/ui/typography/Typography'
import { FlatConfiguratorSections } from '@constants/configurator'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import _ from 'lodash'

import cn from './ConfigurationInfo.module.scss'

const NAMES = {
	workAreaCharacteristics: 'Work area',
	zAxisCharacteristics: 'Tool lift height (Z axis)',
	toolswithchCharacteristics: 'Tool switch',
	spindleCharacteristics: 'Spindle',
	spindleQuantityCharacteristics: 'Motor'
}

export const ConfigurationInfo = ({
	differentCounter,
	compare,
	yourConfiguration,
	basicConfiguration
}) => {
	// TODO Заменить на актуальный айди машины
	const params = configuratorStore.use.seriesConfigurationsSelector(4)
	const params1 = configuratorStore.use.seriesConfigurations()
	const machineId = configuratorStore.use.machineId()

	const handleViewAllSpecification = () => {
		console.log('asdasd')
		modalsStore.set.open(MODALS.configurationModal, {
			configuration: yourConfiguration,
			params: _.get(params1, `${machineId}`)
		})
	}

	const handleViewComparison = () => {
		modalsStore.set.open(MODALS.comparisonModal, {
			basicConfiguration,
			yourConfiguration,
			params
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
				const basicInfo = _.get(_.find(_.get(params1, `${machineId}.${section}`), ({ characteristicId }) => characteristicId === basicAccessoriesId), 'staticCharacteristic')
				const basicValue = `${_.get(basicInfo, 'name')} ${_.get(basicInfo, 'unit') ?? ''}`

				const yourAccessoriesId = yourConfiguration[section]
				const yourInfo = _.get(_.find(_.get(params1, `${machineId}.${section}`), ({ characteristicId }) => characteristicId === yourAccessoriesId), 'staticCharacteristic')

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
							{NAMES[section]}
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
			{compare && differentCounter === 0 ? null : (
				<div className={cn.lastRow}>
					<div></div>
					{compare ? (
						<div></div>
					) : (
						<Typography
							tag='p'
							size='s'
							weight='regular'
							discolored={true}
						>
							+{FlatConfiguratorSections.length - 5} parameters
						</Typography>
					)}
					{compare ? (
						<Typography
							tag='p'
							size='s'
							weight='regular'
							discolored={true}
						>
							+{FlatConfiguratorSections.length - 5} changes
						</Typography>
					) : (
						<div></div>
					)}
				</div>
			)}
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
