import clsx from 'clsx'
import { FC } from 'react'

import styles from './Quantity.module.scss'

const Quantity: FC<{
	quantity: number
	limit?: number
	disabled?: boolean
	onChange: (value: number) => void
}> = ({ quantity, limit, disabled, onChange }) => {
	return (
		<div className={styles.wrapper}>
			<button
				className={styles.button}
				disabled={disabled || quantity < 2}
				onClick={() => onChange(quantity - 1)}
			/>
			<div className={clsx(styles.quantity, disabled && styles.disabled)}>
				{quantity}
			</div>
			<button
				className={clsx(styles.button, styles.buttonPlus)}
				disabled={disabled || quantity > limit - 1}
				onClick={() => onChange(quantity + 1)}
			/>
		</div>
	)
}

export default Quantity
