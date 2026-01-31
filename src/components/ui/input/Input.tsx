'use client'

import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { FC, useState } from 'react'

import styles from './Input.module.scss'

const Input: FC<{
	className?: string
	name?: string
	value?: any
	error?: any
	hideError?: boolean
	label?: string
	placeholder?: string
	hasBorder?: boolean
	disabled?: boolean
	onChange?: (value: string) => void
	onFocus?: () => void
	onBlur?: () => void,
	inputClassName?: string
	inputWrapperClassName?: string
}> = props => {
	const [focused, setFocused] = useState<boolean>(false)

	const handleChange = event => {
		const value = event.target.value

		props?.onChange?.(value)
	}

	const handleFocus = () => {
		setFocused(true)

		props?.onFocus?.()
	}

	const handleBlur = () => {
		setFocused(false)

		props?.onBlur?.()
	}

	return (
		<label
			className={clsx(
				styles.wrapper,
				(props.hasBorder ?? true) && styles.hasBorder,
				focused && styles.focused,
				props.error && styles.inputError,
				props.className && props.className
			)}
		>
			{props.label && <div className={styles.wrapperLabel}>{props.label}</div>}
			<div className={clsx(styles.inputWrapper, props.inputWrapperClassName ?? {})}>
				<input
					className={clsx(styles.input, props.inputClassName ?? {})}
					name={props.name}
					type='text'
					placeholder={props.placeholder}
					value={props.value}
					disabled={props.disabled}
					onFocus={handleFocus}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
			{props.error && !props.hideError && (
				<Typography
					className={styles.error}
					tag='p'
					size='m'
					weight='regular'
				>
					{props.error}
				</Typography>
			)}
		</label>
	)
}

export default Input
