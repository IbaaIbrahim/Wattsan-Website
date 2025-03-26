'use client'

import clsx from 'clsx'
import { FC } from 'react'

import cn from './FormRadioConfigurator.module.scss'

export const FormRadioConfigurator: FC<{
	className?: string
	bordered?: boolean
	value: any
	color?: 'blue' | 'dark'
	options: { value: any; text: any }[]
	onChange: (value: string) => void
}> = ({
	className,
	value,
	bordered = true,
	options,
	color = 'blue',
	onChange
}) => {
	return (
		<div
			className={clsx(
				className,
				cn.wrapper,
				cn[color],
				bordered && cn.bordered
			)}
		>
			<div className={cn.fields}>
				{options.map(option => (
					<label
						className={clsx(
							cn.field,
							option.value == value && cn.fieldSelected
						)}
						key={option.value}
					>
						<div
							className={clsx(
								cn.input,
								option.value == value && cn.inputChecked
							)}
						/>
						<input
							className={cn.hidden}
							value={option.value}
							checked={option.value == value}
							type='radio'
							onChange={() => onChange(option.value)}
						/>
						<div className={cn.label}>{option.text}</div>
					</label>
				))}
			</div>
		</div>
	)
}
