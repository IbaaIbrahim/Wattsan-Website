import { Typography } from '@components/ui/typography/Typography'
import { FlatConfiguratorSections, SUBSECTIONS_TITLE } from '@constants/configurator'

import cn from './ConfigurationModal.module.scss'

export const ConfigurationModal = ({ configuration, params }) => {
	return (
		<div>
			<Typography
				className={cn.title}
				tag='h2'
			>
				Your configuration
			</Typography>
			<div className={cn.table}>
				{FlatConfiguratorSections.map(section => {
					const id = configuration[section]
					const { name, unit, price } = params?.[section]?.find?.(
						({ characteristicId }) => characteristicId === id
					)?.staticCharacteristic ?? {
						name: '',
						value: 'Not included',
						price: '0'
					}

					return (
						<div
							className={cn.row}
							key={section}
						>
							<Typography
								className={cn.section}
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
								{`${name} ${unit ?? ''}`}
							</Typography>
							<Typography
								tag='p'
								size='s'
								align='right'
							>
								{`$${price}`}
							</Typography>
						</div>
					)
				})}
			</div>
		</div>
	)
}
