'use client'

import Tooltip from '@components/ui/tooltip/Tooltip'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import {
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import styles from './FormAutocomplete.module.scss'

type TProps = {
	className?: string
	name: string
	value: string
	error?: string
	label?: string
	placeholder?: string
	size?: 'm' | 'l'
	color?: 'black' | 'blue'
	textByValue?: boolean
	disabled?: boolean
	leftAddon?: ReactNode
	rightAddon?: ReactNode
	options?: { id: string; value: string; content?: ReactNode }[]
	onChange?: (value: string) => void
	onSelect?: (params: { id: string; value: string }) => void
}

const FormAutocomplete: FC<TProps> = ({
	className,
	name,
	label,
	placeholder,
	size = 'l',
	color = 'black',
	value,
	error,
	disabled = false,
	leftAddon = null,
	rightAddon = null,
	onChange,
	onSelect,
	options = []
}) => {
	const ref = useRef() as any
	const listRef = useRef() as any

	const [open, setOpen] = useState<boolean>(false)

	const handleToggle = visible => {
		setOpen(visible)
	}

	const handleFocus = () => {
		setOpen(true)
	}

	const handleBlur = () => {
		setOpen(false)
	}

	const handleChange = event => {
		onChange?.(event?.target?.value)
	}

	const handleSelect = value => {
		setOpen(false)

		onChange?.(value.value)
		onSelect?.(value)
	}

	const calcOptionsListWidth = useCallback(() => {
		if (listRef.current) {
			const optionsListMinWidth = ref.current
				? ref.current.getBoundingClientRect().width
				: 0

			listRef.current.setAttribute('style', '')
			listRef.current.style.width = `${optionsListMinWidth}px`
		}
	}, [])

	useEffect(() => {
		const ResizeObserver = window.ResizeObserver
		const observer = new ResizeObserver(calcOptionsListWidth)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [calcOptionsListWidth, open])

	const filteredOptions = useMemo(() => {
		const regex = new RegExp(
			value
				?.toLowerCase()
				?.replace(/(?!$)|(?=$)/gm, '.*')
				?.replace(/(\[|\])/gm, '')
		)

		return options?.filter(option => regex.test(option.value.toLowerCase()))
	}, [options, value])

	return (
		<Tooltip
			placement='bottom-start'
			trigger='outsideClick'
			opened={open}
			onToggle={handleToggle}
			content={
				<div
					ref={listRef}
					className={styles.options}
				>
					{filteredOptions.map(option => (
						<button
							className={styles.option}
							key={option.id}
							value={option.value}
							onClick={() => handleSelect(option)}
						>
							<Typography
								tag='p'
								size='m'
								weight='regular'
							>
								{option?.content ? option.content : option.value}
							</Typography>
						</button>
					))}
				</div>
			}
		>
			<label
				ref={ref}
				className={clsx(
					styles.field,
					color && styles[color],
					size && styles[size],
					error && styles.error,
					open && styles.opened,
					className && className
				)}
			>
				<div className={styles.label}>{label}</div>
				<div className={clsx(styles.wrapper)}>
					{leftAddon && <div className={styles.leftAddon}>{leftAddon}</div>}
					<input
						className={styles.input}
						name={name}
						autoComplete={undefined}
						type='text'
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					{rightAddon && <div className={styles.rightAddon}>{rightAddon}</div>}
				</div>
				{error && (
					<Typography
						className={styles.errorMessage}
						tag='p'
						size='m'
						weight='regular'
					>
						{error}
					</Typography>
				)}
			</label>
		</Tooltip>
	)
}

export default FormAutocomplete
