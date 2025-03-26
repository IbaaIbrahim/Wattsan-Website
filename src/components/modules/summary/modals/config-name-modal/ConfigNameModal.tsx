import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import { Typography } from '@components/ui/typography/Typography'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import React, { useState } from 'react'

import styles from './ConfigNameModal.module.scss'

const ConfigNameModal = () => {
	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const configurationName = configuratorStore.use.customName()

	const [currentName, setCurrentName] = useState<string>(configurationName)

	const handleSave = () => {
		configuratorStore.set.customName(currentName)
		modalsStore.set.close()
	}

	return (
		<>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Change configuration name
			</Typography>
			<Typography
				className={styles.description}
				tag='p'
				size='m'
				weight='regular'
			>
				You can only change the caption, not the main title, of the equipment
				you have configured.
			</Typography>
			<Typography
				className={styles.categoryName}
				tag='p'
				size='l'
				discolored={true}
			>
				{categoryInfo.name}
			</Typography>
			<Typography
				className={styles.machineName}
				tag='p'
				size='l'
			>
				{machineInfo.name}&nbsp;
				<Typography
					tag='p'
					size='m'
					weight='regular'
				>
					{currentName}
				</Typography>
			</Typography>
			<Input
				className={styles.field}
				name='configurationName'
				value={currentName}
				label='Configuration name'
				placeholder='Write configuration name'
				onChange={value => setCurrentName(value)}
			/>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					onClick={handleSave}
				>
					Save
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}

export default ConfigNameModal
