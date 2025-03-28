import { basketStore } from '@store/basket'
import { basketForm } from '@store/forms'
import clsx from 'clsx'
import { FC } from 'react'

import styles from './DeliveryMethod.module.scss'

const DeliveryMethod: FC<{ className: string }> = ({ className }) => {
	const { country, deliveryMethod } = basketForm.use.valuesSelector()

	const deliveryMethods = basketStore.use.deliveryMethodsSelector({
		countryId: country
	})

	return (
		<div className={clsx(styles.wrapper, className && className)}>
			{deliveryMethods.map(({ id, name, cost, details }) => (
				<label
					key={id}
					className={clsx(
						styles.field,
						id === deliveryMethod && styles.fieldSelected
					)}
				>
					<input
						type='radio'
						className={styles.hidden}
						value={id}
						onClick={() => basketForm.set.change('deliveryMethod', id)}
					/>
					<div
						className={clsx(
							styles.radio,
							id === deliveryMethod && styles.radioSelected
						)}
					/>
					<div className={styles.name}>{name}</div>
					<div className={styles.cost}>{cost}</div>
					<div className={styles.divider} />
					<div className={styles.condition}>{details}</div>
				</label>
			))}
		</div>
	)
}

export default DeliveryMethod
