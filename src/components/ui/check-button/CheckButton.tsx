import styles from './CheckButton.module.scss'

const CheckButton = ({
	label,
	selected,
	onSelect
}: {
	label: string
	selected: boolean
	onSelect: () => void
}) => {
	return (
		<button
			onClick={onSelect}
			className={`${styles.btn} ${selected ? styles['btn--selected'] : ''}`}
		>
			{label}
		</button>
	)
}

export default CheckButton
