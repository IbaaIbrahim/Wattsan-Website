'use client'

import { FC } from 'react'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import { Typography } from '@components/ui/typography/Typography'
import ProductParameterRadio from './ProductParameterRadio'
import clsx from 'clsx'

import styles from './ProductParameters.module.scss'

import { ProductParameter, ProductParameterOption } from '@my-types/product'

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
						{param.options && param.options.length > 3 ? (
							<FormSelect
								label={param.label}
								value={param.value}
								options={param.options as ProductParameterOption[]}
								onSelect={(value) => param.onChange && param.onChange(value)}
								size='l'
								bordered
							/>
						) : (
							<ProductParameterRadio
								label={param.label}
								value={param.value}
								options={param.options as ProductParameterOption[]}
								onChange={(value) => param.onChange && param.onChange(value)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductParameters
