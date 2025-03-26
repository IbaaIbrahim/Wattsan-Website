import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import styles from './Tags.module.scss'

const Tag: FC<{
	children: ReactNode
	size: 'l' | 'm'
	selected: boolean
	disabled: boolean
	onClick: () => void
}> = ({ children, selected, size, disabled, onClick }) => {
	return (
		<button
			className={clsx(
				styles.tag,
				selected && styles.selected,
				disabled && styles.disabled,
				styles[size]
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

const Tags: FC<{
	items: { id: string; content: ReactNode; counter?: string }[]
	selected: string[]
	size?: 'l' | 'm'
	disabled?: boolean
	onClick: (id: string) => void
}> = ({ items, selected, disabled = false, size = 'm', onClick }) => {
	return (
		<div className={styles.tags}>
			<div className={styles.tagsContent}>
				{items.map(({ content, id, counter = null }) => (
					<Tag
						size={size}
						key={id}
						selected={selected.includes(id)}
						disabled={disabled}
						onClick={() => onClick(id)}
					>
						{content}
						{counter && <div className={styles.counter}>{counter}</div>}
					</Tag>
				))}
			</div>
		</div>
	)
}

export default Tags
