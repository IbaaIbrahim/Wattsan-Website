'use client'

import clsx from 'clsx'
import { FC } from 'react'

import styles from './FormRadion.module.scss'

const FormRadio: FC<{
	className?: string
	name: string
	label?: string
	disabled?: boolean
	value: string | number
	options: { value: string | number; text: string }[]
	onChange: (value: string | number) => void
}> = ({
	className,
	name,
	label,
	value,
	disabled = false,
	options,
	onChange
}) => {
	return (
		<div className={clsx(className && className, disabled && styles.disabled)}>
			<div className={styles.fieldLabel}>{label}</div>
			<div className={styles.fields}>
				{options.map(option => (
					<label
						className={styles.field}
						key={option.value}
					>
						<div
							className={clsx(
								styles.input,
								option.value === value && styles.inputChecked
							)}
						/>
						<input
							className={styles.hidden}
							value={option.value}
							checked={option.value === value}
							disabled={disabled}
							type='radio'
							name={name}
							onChange={() => onChange(option.value)}
						/>
						<div className={styles.label}>{option.text}</div>
					</label>
				))}
			</div>
		</div>
	)
}

export default FormRadio
