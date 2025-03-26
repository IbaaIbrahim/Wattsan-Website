import { basketStore } from '@store/basketStore'
import clsx from 'clsx'
import { FC } from 'react'

import styles from './DeliveryMethod.module.scss'

const DeliveryMethod: FC<{ className: string }> = ({ className }) => {
	const { checkoutInfo, deliveryMethod, changeDeliveryMethod } = basketStore(
		({ checkoutInfo, deliveryMethod, changeDeliveryMethod }) => ({
			checkoutInfo,
			deliveryMethod,
			changeDeliveryMethod
		})
	)

	return (
		<div className={clsx(styles.wrapper, className && className)}>
			{checkoutInfo.deliveryMethods.map(({ id, name, cost, conditions }) => (
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
						onClick={() => changeDeliveryMethod(id)}
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
					{conditions.map((condition, index) => (
						<div
							key={index}
							className={styles.condition}
						>
							{condition}
						</div>
					))}
				</label>
			))}
		</div>
	)
}

export default DeliveryMethod
