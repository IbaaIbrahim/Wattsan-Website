'use client'

import { FC } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductParameterRadio.module.scss'

import { ProductParameterOption } from '@my-types/product'

interface ProductParameterRadioProps {
	label: string
	value: string | number
	options: ProductParameterOption[]
	onChange: (value: string | number) => void
	className?: string
}

const ProductParameterRadio: FC<ProductParameterRadioProps> = ({
	label,
	value,
	options,
	onChange,
	className
}) => {
	return (
		<div className={clsx(styles.radioGroup, className)}>
			<Typography tag='p' size='m' weight='regular' className={styles.label}>
				{label}
			</Typography>
			<div className={styles.options}>
				{options.map((option) => {
					const isSelected = option.value === value
					const isNotIncluded = option.text.toLowerCase().includes('not included')

					return (
						<label
							key={option.value}
							className={clsx(
								styles.option,
								isSelected && styles.selected,
								isSelected && isNotIncluded && styles.notIncluded
							)}
						>
							<input
								type='radio'
								value={option.value}
								checked={isSelected}
								onChange={() => onChange(option.value)}
								className={styles.input}
							/>
							<div className={styles.content}>
								<Typography tag='p' size='m' weight='regular'>
									{option.text}
								</Typography>
								{option.price && (
									<Typography tag='p' size='m' weight='regular' className={styles.price}>
										{option.price}
									</Typography>
								)}
							</div>
						</label>
					)
				})}
			</div>
		</div>
	)
}

export default ProductParameterRadio
