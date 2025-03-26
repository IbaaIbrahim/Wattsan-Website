import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import styles from './FormToggle.module.scss'

const FormToggle: FC<{
	content: { value: string; content: ReactNode }[]
	value: string
	onChange: (value: string) => void
}> = ({ value, content, onChange }) => {
	return (
		<div className={styles.toggle}>
			<div className={styles.content}>
				{content.map(item => (
					<button
						key={item.value}
						className={clsx(
							styles.item,
							value === item.value && styles.itemChecked
						)}
						onClick={() => onChange(item.value)}
					>
						{item.content}
					</button>
				))}
			</div>
		</div>
	)
}

export default FormToggle
