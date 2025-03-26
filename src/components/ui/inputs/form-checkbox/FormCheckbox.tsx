import checkEmptyIcon from '@public/img/icons/check-empty.svg'
import checkIcon from '@public/img/icons/check.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import styles from './FormCheckbox.module.scss'

const FormCheckbox: FC<{
	className?: string
	name?: string
	label?: string
	disabled?: boolean
	selected?: any
	error?: any
	onChange?: (value: boolean) => void
}> = ({
	className,
	name,
	label,
	disabled = false,
	selected,
	error,
	onChange
}) => {
	return (
		<label
			className={clsx(
				styles.wrapper,
				disabled && styles.disabled,
				className && className
			)}
		>
			<input
				className={styles.hidden}
				name={name}
				type='checkbox'
				disabled={disabled}
				checked={selected}
				onChange={() => onChange?.(!selected)}
			/>
			<div className={styles.checkbox}>
				<Image
					src={selected ? checkIcon : checkEmptyIcon}
					alt=''
				/>
			</div>
			<div className={styles.label}>{label}</div>
		</label>
	)
}

export default FormCheckbox
