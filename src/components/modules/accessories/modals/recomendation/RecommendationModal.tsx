import Button from '@components/ui/button/Button'
import { FormRadioConfigurator } from '@components/ui/inputs/form-radio/configurator-variant/FormRadioConfigurator'
import { Typography } from '@components/ui/typography/Typography'
import { modalsStore } from '@store/modals'
import React, { useState } from 'react'

import styles from './RecommendationModal.module.scss'

const RecommendationModal = ({
	machineName,
	paramName,
	suggestions,
	actionButtonText,
	onAction
}: {
	machineName: string
	paramName: string
	suggestions: {
		suggestionDetails: string
		suggestionId: number
	}[]
	actionButtonText: string
	onAction: (value: any) => void
}) => {
	const [selected, setSelected] = useState<any>(suggestions?.[0]?.suggestionId)

	return (
		<>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Incompatibility issue
			</Typography>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='l'
			>
				These accessories are not compatible with {machineName}
			</Typography>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Typography
						tag='p'
						size='s'
					>
						{paramName}
					</Typography>
				</li>
			</ul>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='l'
			>
				You can configure a new machine while saving the current configuration
			</Typography>
			<div className={styles.recommendations}>
				<FormRadioConfigurator
					value={selected}
					options={suggestions.map(({ suggestionDetails, suggestionId }) => ({
						text: suggestionDetails,
						value: suggestionId
					}))}
					color='dark'
					onChange={value => setSelected(value)}
				/>
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					onClick={() => onAction(selected)}
				>
					{actionButtonText}
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Cancel
				</Button>
			</div>
			<Typography
				tag='p'
				size='s'
				discolored={true}
				align='center'
			>
				Cancelling result: Work area size 600х900 mm
			</Typography>
		</>
	)
}

export default RecommendationModal
