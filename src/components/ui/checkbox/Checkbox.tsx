import clsx from 'clsx'

import styles from './Checkbox.module.scss'

export enum Type {
	CATEGORY = 'category',
	ACCESSORIE = 'accessory',
	RECOMMENDATION = 'recommendation'
}

const Checkbox = ({
	label,
	selected,
	type,
	highlighted,
	disabled,
	onSelect,
	onHover
}: {
	label?: string
	selected: boolean
	type: Type
	highlighted?: boolean
	disabled?: boolean
	onSelect: () => void
	onHover?: (hovered: boolean) => void
}) => {
	return (
		<label
			className={clsx(
				styles.container,
				!label && styles.withoutLabel,
				selected && styles.selected,
				highlighted && styles.highlighted,
				disabled && styles.disabled
			)}
			onMouseOver={() => onHover?.(true)}
			onMouseOut={() => onHover?.(false)}
		>
			<input
				className={styles.input}
				type='checkbox'
				checked={selected}
				onChange={onSelect}
			/>
			<span className={styles.checkmark} />
			{label && <span className={styles.label}>{label}</span>}
		</label>
	)
}

export default Checkbox
