'use client'

import CheckButton from '@components/ui/check-button/CheckButton'
import { configuratorStore } from '@store/configurator'
import { equipmentCategoryForm, equipmentFiltersForm } from '@store/forms'

import styles from './WorkingArea.module.scss'

const WorkingArea = () => {
	const categoryId = configuratorStore.use.categoryId()
	const values = equipmentFiltersForm.use.valuesSelector() as any

	const areas = configuratorStore.use.staticCharacteristicSelector(categoryId)

	return (
		<div className={styles.container}>
			<div className={styles['filter-btn']}>
				<CheckButton
					onSelect={() =>
						equipmentFiltersForm.set.filter('workAreaFilter', 'all')
					}
					label='All'
					selected={values?.workAreaFilter?.includes('all')}
				/>
			</div>
			{areas.map(({ id, name, unit }) => (
				<div
					key={id}
					className={styles['filter-btn']}
				>
					<CheckButton
						onSelect={() =>
							equipmentFiltersForm.set.filter('workAreaFilter', id)
						}
						label={`${name}${unit}`}
						selected={values?.workAreaFilter?.includes(id)}
					/>
				</div>
			))}
		</div>
	)
}

export default WorkingArea
