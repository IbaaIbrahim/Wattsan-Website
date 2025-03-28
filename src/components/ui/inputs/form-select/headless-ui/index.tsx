import { Typography } from '@components/ui/typography/Typography'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions
} from '@headlessui/react'
import arrowRightIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

import styles from './styles.module.scss'

export const FormSelect: FC<{
	className?: string
	name?: string
	size?: 'm' | 'l'
	color?: 'black' | 'blue'
	bordered?: boolean
	value: any
	error?: ReactNode
	label?: string
	placeholder?: string
	options: { text: string; value: any }[]
	onSelect: (selected: any) => void
}> = ({
	className,
	size = 'l',
	color = 'blue',
	bordered = false,
	name,
	placeholder,
	value,
	error,
	options,
	onSelect
}) => {
	return (
		<Listbox
			name={name}
			value={value}
			onChange={selected => onSelect(selected)}
		>
			<ListboxButton
				className={clsx(
					styles.button,
					bordered && styles.bordered,
					color && styles[color],
					size && styles[size],
					error && styles.error,
					className
				)}
			>
				<Typography
					tag='p'
					size='m'
					weight='regular'
					discolored={!value}
				>
					{options.find(option => option.value === value)?.text ?? placeholder}
				</Typography>
				<div className={styles.icon}>
					<Image
						src={arrowRightIcon}
						alt=''
					/>
				</div>
			</ListboxButton>
			<ListboxOptions
				className={styles.dropdown}
				anchor={{
					to: 'bottom start',
					gap: 8
				}}
				transition={true}
			>
				{options.map(option => (
					<ListboxOption
						className={styles.item}
						key={option.text}
						value={option.value}
					>
						<Typography
							tag='p'
							size='m'
							weight='regular'
						>
							{option.text}
						</Typography>
					</ListboxOption>
				))}
			</ListboxOptions>
		</Listbox>
	)
}
