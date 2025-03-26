'use client'

import Card from '@components/modules/comparison/card/Card'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import Tags from '@components/ui/tags/Tags'
import trashIcon from '@public/img/icons/basket.svg'
import { comparisonStore, selectEquipmentByType } from '@store/comparisonStore'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import styles from './page.module.scss'

const selected = id => ({
	id,
	image: '/img/grid-machines/A1.png',
	name: 'Laser Cutting Engraving Machine',
	code: `${id} ST`,
	status: 'modified',
	isCompared: true,
	isFavorites: false,
	'Work area': '500 x 300 mm',
	'Tube power': '400 W',
	'Max engraving speed': '700 mm',
	Dimensions: '650 mm * 1040 mm * 575 mm',
	'Net weight': '38 kg'
})

const equipmentsByType = {
	'01': {
		'0101': selected('0101'),
		'0102': selected('0102'),
		'0103': selected('0103')
	},
	'02': {
		'0201': selected('0201'),
		'0202': selected('0202'),
		'0203': selected('0203')
	},
	'03': {
		'0301': selected('0301'),
		'0302': selected('0302'),
		'0303': selected('0303')
	},
	'04': {
		'0401': selected('0401'),
		'0402': selected('0402'),
		'0403': selected('0403')
	},
	'05': {
		'0501': selected('0501'),
		'0502': selected('0502'),
		'0503': selected('0503')
	},
	'06': {
		'0601': selected('0601'),
		'0602': selected('0602'),
		'0603': selected('0603')
	},
	'07': {
		'0701': selected('0701'),
		'0702': selected('0702'),
		'0703': selected('0703')
	},
	'08': {
		'0801': selected('0801'),
		'0802': selected('0802'),
		'0803': selected('0803')
	}
}

const parameters = [
	'Work area',
	'Tube power',
	'Max engraving speed',
	'Dimensions',
	'Net weight'
]

const Page = () => {
	const [select, setSelect] = useState('01')

	const { equipmentType, changeEquipmentType, clearEquipmentByType } =
		comparisonStore(
			({ equipmentType, changeEquipmentType, clearEquipmentByType }) => ({
				equipmentType,
				changeEquipmentType,
				clearEquipmentByType
			})
		)

	const { equipments, changeEquipments } = comparisonStore(
		selectEquipmentByType(equipmentType)
	)

	const compareAvailable =
		equipments.filter(value => value !== null).length >= 2

	return (
		<div className={styles.page}>
			<div className={styles.title}>Comparison</div>
			<div className={styles.pageSelect}>
				<button
					className={clsx(
						styles.pageSelectButton,
						select === '01' && styles.pageSelectButtonSelected
					)}
					onClick={() => setSelect('01')}
				>
					Equipment
				</button>
				<button
					className={clsx(
						styles.pageSelectButton,
						select === '02' && styles.pageSelectButtonSelected
					)}
					onClick={() => setSelect('02')}
				>
					Accessories
				</button>
			</div>
			<Tags
				size='l'
				selected={[equipmentType]}
				onClick={changeEquipmentType}
				items={[
					{ id: '01', content: 'Laser machines' },
					{ id: '02', content: 'CNC Routers' },
					{ id: '03', content: 'Laser markers' },
					{ id: '04', content: 'Metal Cutters' },
					{ id: '05', content: 'Laser welding' },
					{ id: '06', content: 'Laser cleaning' },
					{ id: '07', content: 'Laser pipe cutting' },
					{ id: '08', content: 'Hydraulic press brakes' }
				]}
			/>
			<div className={styles.cards}>
				<div className={styles.hideTablet} />
				{equipments.map((equipmentId, index) => (
					<Card
						className={styles.card}
						key={index}
						options={Object.values(equipmentsByType[equipmentType])}
						selected={equipmentsByType[equipmentType][equipmentId] ?? {}}
						onSelect={selectedId =>
							changeEquipments(selectedId, index, equipmentType)
						}
						onRemoveCompare={selectedId =>
							changeEquipments(selectedId, index, equipmentType)
						}
						onToggleFavorites={() => {}}
					/>
				))}
			</div>
			<div className={styles.actions}>
				<div className={styles.actionsContent}>
					<FormCheckbox
						selected={false}
						disabled={!compareAvailable}
						label='Show only differences'
					/>
					<button
						disabled={!compareAvailable}
						className={clsx(
							styles.actionsButton,
							!compareAvailable && styles.actionsButtonDisabled
						)}
						onClick={() => clearEquipmentByType(equipmentType)}
					>
						<Image
							src={trashIcon}
							alt=''
						/>
						Delete all products from the category
					</button>
				</div>
				<div className={styles.actionsDivider} />
			</div>
			<div className={styles.table}>
				{parameters.map(parameterName => (
					<div
						className={styles.row}
						key={parameterName}
					>
						<div className={styles.parameterName}>{parameterName}</div>
						<div className={styles.values}>
							{equipments.map((equipmentId, index) => (
								<div
									className={styles.parameter}
									key={index}
								>
									{
										equipmentsByType[equipmentType][equipmentId]?.[
											parameterName
										]
									}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Page
