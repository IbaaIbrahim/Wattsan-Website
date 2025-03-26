import { FC } from 'react'

import styles from './FormTextarea.module.scss'

const FormTextarea: FC<{
	name: string
	value: string
	error?: string
	disabled?: boolean
	label: string
	placeholder: string
	onChange: (value: string) => void
}> = ({
	name,
	value,
	error,
	label,
	placeholder,
	disabled = false,
	onChange
}) => {
	const handleChange = event => {
		onChange(event?.target?.value)
	}

	return (
		<label className={styles.wrapper}>
			<div className={styles.label}>{label}</div>
			<textarea
				className={styles.textarea}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				cols={30}
				rows={6}
				value={value}
				onChange={handleChange}
			/>
		</label>
	)
}

export default FormTextarea
