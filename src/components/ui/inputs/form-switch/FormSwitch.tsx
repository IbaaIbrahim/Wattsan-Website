import clsx from 'clsx'
import { FC } from 'react'

import styles from './FormSwitch.module.scss'

const FormSwitch: FC<{
	className?: string
	name: string
	checked: boolean
	label: string
	onChange: (value: boolean) => void
}> = ({ className, name, checked, label, onChange }) => {
	const handleChange = () => {
		onChange(!checked)
	}

	return (
		<label
			className={clsx(
				styles.component,
				className && className,
				checked && styles.checked
			)}
		>
			<input
				name={name}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			<span className={styles.switch} />
			<span className={styles.content}>
				{label && <span className={styles.label}>{label}</span>}
			</span>
		</label>
	)
}

export default FormSwitch
