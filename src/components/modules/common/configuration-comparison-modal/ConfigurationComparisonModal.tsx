import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import clsx from 'clsx'
import { FC, useState } from 'react'

import styles from './ConfigurationComparisonModal.module.scss'

const ConfigurationComparisonModal: FC<{
	className?: string
	basicSpecification: any
	params: any
}> = ({ basicSpecification, params }) => {
	const [compared, setCompared] = useState<boolean>(false)

	const formatted: {
		equal: boolean
		compareValue: string
		name: string
		basicValue: string
	}[] = Object.entries(basicSpecification).map(([name, value]) => {
		const compareValue = params.specification[name] ?? 'Not included'

		return {
			name,
			basicValue: value as string,
			compareValue,
			equal: value === compareValue
		}
	})

	return (
		<>
			<div className={styles.title}>Comparison with basic</div>
			<FormCheckbox
				className={styles.compare}
				label='Show only differences'
				selected={compared}
				onChange={() => setCompared(!compared)}
			/>
			<div className={styles.comparisonWrapper}>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Basic</th>
							<th>Your configuration</th>
						</tr>
					</thead>
					<tbody className={clsx(compared && styles.compared)}>
						{formatted.map(({ name, basicValue, compareValue, equal }) => (
							<tr key={name}>
								<td>{name}</td>
								<td className={clsx(compared && !equal && styles.difference)}>
									{basicValue}
								</td>
								<td className={clsx(compared && !equal && styles.difference)}>
									{compareValue}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default ConfigurationComparisonModal
