'use client'

import Tooltip from '@components/ui/tooltip/Tooltip'
import arrowRightIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import styles from './FormSelect.module.scss'

const FormSelect: FC<{
	className?: string
	size?: 'l' | 'm'
	bordered?: boolean
	name?: string
	value: any
	label?: string
	placeholder?: string
	options: { text: string; value: string | number }[]
	renderValue?: (value) => ReactNode
	onSelect: (selected: string) => void
}> = ({
	className,
	size = 'l',
	bordered = false,
	name,
	value,
	label,
	placeholder,
	options,
	renderValue,
	onSelect
}) => {
	const ref = useRef() as any
	const listRef = useRef() as any

	const [open, setOpen] = useState<boolean>(false)

	const mappedValue = options.find(option => option.value == value)?.text ?? ''

	const handleToggle = visible => {
		setOpen(visible)
	}

	const handleFocus = () => {
		setOpen(!open)
	}

	const handleSelect = value => {
		setOpen(false)

		onSelect(value)
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
					{options.map(option => (
						<button
							className={styles.option}
							key={option.value}
							value={option.value}
							onClick={() => handleSelect(option.value)}
						>
							{option.text}
						</button>
					))}
				</div>
			}
		>
			<label
				ref={ref}
				className={clsx(
					styles.field,
					styles[size],
					open && styles.opened,
					bordered && styles.bordered,
					className && className
				)}
			>
				<div className={styles.label}>{label}</div>
				<div className={styles.wrapper}>
					<input
						className={styles.input}
						name={name}
						autoComplete={undefined}
						type='text'
						placeholder={placeholder}
						value={mappedValue}
						onClick={handleFocus}
					/>
					<div className={styles.select}>
						{!value && !!placeholder ? (
							<div className={styles.placeholder}>{placeholder}</div>
						) : (
							<div className={styles.value}>
								{renderValue?.(mappedValue) ?? mappedValue}
							</div>
						)}
					</div>
					<div className={styles.icon}>
						<Image
							src={arrowRightIcon}
							alt=''
						/>
					</div>
				</div>
			</label>
		</Tooltip>
	)
}

export default FormSelect
