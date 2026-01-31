'use client'

import { FC } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductRadioOption.module.scss'

interface ProductRadioOptionProps {
	value: string | number
	label: string
	price?: string
	isSelected: boolean
	onChange: () => void
}

const ProductRadioOption: FC<ProductRadioOptionProps> = ({
	value,
	label,
	price,
	isSelected,
	onChange
}) => {
	return (
		<label
			className={clsx(styles.option, isSelected && styles.selected)}
			onClick={onChange}
		>
			<input
				type='radio'
				value={value}
				checked={isSelected}
				onChange={onChange}
				className={styles.hidden}
			/>
			<div className={styles.radio}>
				{isSelected && <div className={styles.radioDot} />}
			</div>
			<div className={styles.content}>
				<Typography tag='p' size='m' weight='regular'>
					{label}
				</Typography>
				{price && (
					<Typography tag='p' size='m' weight='regular' className={styles.price}>
						{price}
					</Typography>
				)}
			</div>
		</label>
	)
}

export default ProductRadioOption
