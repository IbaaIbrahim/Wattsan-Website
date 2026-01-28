'use client'

import { FC } from 'react'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import { Typography } from '@components/ui/typography/Typography'
import ProductParameterRadio, { RadioOption } from './ProductParameterRadio'
import clsx from 'clsx'

import styles from './ProductParameters.module.scss'

export interface ParameterOption {
	value: string | number
	text: string
	price?: string
}

export interface RadioParameterOption {
	value: string | number
	text: string
	price?: string
}

export interface ProductParameter {
	id: string
	label: string
	type: 'select' | 'radio'
	value: string | number
	options: ParameterOption[] | RadioParameterOption[]
	onChange: (value: string | number) => void
}

interface ProductParametersProps {
	parameters: ProductParameter[]
	className?: string
}

const ProductParameters: FC<ProductParametersProps> = ({ parameters, className }) => {
	return (
		<div className={clsx(styles.parameters, className)}>
			<Typography tag='h2' size='l' weight='semi-bold' className={styles.title}>
				Choose Parameters
			</Typography>
			<div className={styles.list}>
				{parameters.map((param) => (
					<div key={param.id} className={styles.parameter}>
						{param.type === 'select' ? (
							<FormSelect
								label={param.label}
								value={param.value}
								options={param.options as ParameterOption[]}
								onSelect={(value) => param.onChange(value)}
								size='l'
								bordered
							/>
						) : (
							<ProductParameterRadio
								label={param.label}
								value={param.value}
								options={param.options as RadioOption[]}
								onChange={(value) => param.onChange(value)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductParameters
