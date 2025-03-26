'use client'

import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import { Typography } from '@components/ui/typography/Typography'
import { FlatConfiguratorSections } from '@constants/configurator'
import { useState } from 'react'

import cn from './ComparisonModal.module.scss'

export const ComparisonModal = ({
	basicConfiguration,
	yourConfiguration,
	params
}) => {
	const [diff, setDiff] = useState(false)

	return (
		<div>
			<Typography
				className={cn.title}
				tag='h2'
			>
				Comparison with basic
			</Typography>
			<FormCheckbox
				className={cn.checkbox}
				onChange={setDiff}
				selected={diff}
				label='Show only differences'
			/>
			<div>
				<div className={cn.header}>
					<div className={cn.hideMobile} />
					<Typography
						tag='p'
						size='s'
					>
						Basic
					</Typography>
					<Typography
						tag='p'
						size='s'
					>
						Your configuration
					</Typography>
				</div>
				{FlatConfiguratorSections.map(section => {
					const currentId = yourConfiguration[section]
					const { name: currentName, unit: currentUnit } = params?.[
						section
					]?.find?.(({ id: sectionId }) => sectionId === currentId)
						?.staticCharacteristic ?? {
						name: 'Not included',
						value: 'Not included'
					}

					const basicId = basicConfiguration[section]
					const { name: basicName, unit: basicUnit } = params?.[
						section
					]?.find?.(({ id: sectionId }) => sectionId === basicId)
						?.staticCharacteristic ?? {
						name: 'Not included',
						value: 'Not included'
					}

					const differed = diff ? basicName !== currentName : true

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
								{section}
							</Typography>
							<Typography
								tag='p'
								size='s'
								weight='regular'
								discolored={!differed}
							>
								{basicName} {basicUnit ?? ''}
							</Typography>
							<Typography
								tag='p'
								size='s'
								weight='regular'
								discolored={!differed}
							>
								{currentName} {currentUnit ?? ''}
							</Typography>
						</div>
					)
				})}
			</div>
		</div>
	)
}
