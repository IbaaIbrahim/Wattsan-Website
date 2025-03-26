'use client'

import EquipmentInfo from '@components/modules/account/equipment-info/EquipmentInfo'
import BlankContent from '@components/modules/common/blank-content/BlankContent'
import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import Tags from '@components/ui/tags/Tags'
import { IEquipment } from '@my-types/equipment'
import emptyEquipmentImage from '@public/img/account/empty-equipment.svg'
import { equipmentsStore } from '@store/equipmentStore'
import { FC, useState } from 'react'

import styles from './EquipmentView.module.scss'

const TYPE_MAP = {
	'Laser machines': '0',
	'CNC Routers': '1',
	'Laser markers': '2',
	'Metal Cutters': '3',
	'Laser welding': '4',
	'Laser cleaning': '5',
	'Laser pipe cutting': '6',
	'Hydraulic press brakes': '7'
}

const EquipmentView: FC<{ equipments: IEquipment[] }> = ({ equipments }) => {
	const { filter, changeFilter } = equipmentsStore(state => ({
		filter: state.equipmentFilter,
		changeFilter: state.changeEquipmentFilter
	}))

	const [emeiValue, setEmeiValue] = useState<string>('')
	const [error, setError] = useState<string>('')

	const handleChange = value => {
		setError('')
		setEmeiValue(value)
	}

	const handleFindEquipment = event => {
		event.preventDefault()

		setError('Equipment not found. Please try another serial number.')
	}

	const filtered = equipments.filter(equipment =>
		filter.includes(TYPE_MAP[equipment.type])
	)

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div className={styles.title}>My equipment</div>
				<div className={styles.subtitle}>
					Here is where your equipment and its complete information are stored:
					history,
					<br /> warranty details, manufacturing date, and more.
				</div>
				<div className={styles.searchFormWrapper}>
					<form
						className={styles.searchForm}
						onSubmit={handleFindEquipment}
					>
						<Input
							name='emei'
							label='Equipment serial number'
							placeholder='EMEI'
							value={emeiValue}
							hideError={true}
							error={error}
							onChange={handleChange}
						/>
						<Button
							size='l'
							view='red'
							type='submit'
							disabled={emeiValue.length === 0}
						>
							Find equipment
						</Button>
					</form>
					{error && <div className={styles.searchFormError}>{error}</div>}
				</div>
			</div>
			{equipments.length === 0 ? (
				<BlankContent
					image={emptyEquipmentImage}
					title={
						<>
							You haven't added any <br /> equipment yet
						</>
					}
					description={
						<>
							Enter the serial number of your equipment to find and <br /> add
							it to “My Equipment”. It will then be displayed in <br /> this
							section.
						</>
					}
				/>
			) : (
				<div>
					<div className={styles.listTitle}>Equipment in use</div>
					<div className={styles.filters}>
						<Tags
							size='m'
							selected={filter}
							items={[
								{ content: 'Laser machines', id: '0' },
								{ content: 'CNC Routers', id: '1' },
								{ content: 'Laser markers', id: '2' },
								{ content: 'Metal Cutters', id: '3' },
								{ content: 'Laser welding', id: '4' },
								{ content: 'Laser cleaning', id: '5' },
								{ content: 'Laser pipe cutting', id: '6' },
								{ content: 'Hydraulic press brakes', id: '7' }
							]}
							onClick={changeFilter}
						></Tags>
					</div>
					<div className={styles.equipmentsWrapper}>
						{filtered.map(equipment => (
							<EquipmentInfo
								key={equipment.id}
								equipment={equipment}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default EquipmentView
