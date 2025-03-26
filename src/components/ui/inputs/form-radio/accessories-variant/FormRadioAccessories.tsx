'use client'

import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { FC } from 'react'

import cn from './FormRadioAccessories.module.scss'

export const FormRadioAccessories: FC<{
	withAdditional?: boolean
	className?: string
	value: any
	options: {
		value: any
		text: any
		price: any
		isAvailable: boolean
		additional: any
	}[]
	onChange: (value: string) => void
}> = ({ withAdditional = false, className, value, options, onChange }) => {
	return (
		<div className={clsx(className, withAdditional && cn.withAdditional)}>
			<div className={cn.fields}>
				{options.map(option => (
					<>
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
							<div className={cn.label}>
								<Typography
									tag='p'
									size='s'
									weight={option.isAvailable ? 'semi-bold' : 'regular'}
								>
									{option.text}
								</Typography>
								<Typography
									className={cn.price}
									tag='p'
									size='s'
									weight='regular'
								>
									{option.price}
								</Typography>
							</div>
						</label>
						{option.additional && (
							<div className={cn.additional}>
								<Typography
									tag='p'
									size='s'
									className={cn.additionalTitle}
								>
									Choose length
								</Typography>
								{option.additional}
							</div>
						)}
					</>
				))}
			</div>
		</div>
	)
}
