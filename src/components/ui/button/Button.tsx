'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { FC, MouseEvent, ReactNode } from 'react'

import styles from './Button.module.scss'

const Button: FC<{
	block?: boolean
	className?: string
	children: ReactNode
	leftAddon?: ReactNode
	rightAddon?: ReactNode
	size?: 's' | 'm' | 'l'
	view?: 'default' | 'red' | 'black' | 'blue' | 'green' | 'bordered' | 'accent'
	type?: 'submit' | 'button'
	disabled?: boolean
	href?: string | null
	withoutContent?: boolean
	addonsHideMobile?: boolean
	withoutBorder?: boolean
	target?: string
	onClick?: (event: MouseEvent<HTMLElement>) => void
}> = ({
	block = false,
	className,
	href,
	children = null,
	leftAddon,
	rightAddon,
	size = 'm',
	view = 'red',
	type,
	disabled = false,
	withoutContent = false,
	addonsHideMobile = false,
	withoutBorder = false,
	target = '_self',
	onClick
}) => {
		if (href) {
			return (
				<Link
					className={clsx(
						styles.button,
						styles[size],
						styles[view],
						disabled && styles.disabled,
						block && styles.block,
						withoutContent && styles.withoutContent,
						addonsHideMobile && styles.buttonWithoutAddons,
						withoutBorder && styles.withoutBorder,
						className && className
					)}
					href={href}
					type={type}
					onClick={onClick}
					target={target}
				>
					{leftAddon && (
						<span
							className={clsx(
								styles.leftAddon,
								addonsHideMobile && styles.addonsHideMobile
							)}
						>
							{leftAddon}
						</span>
					)}
					{children}
					{rightAddon && (
						<span
							className={clsx(
								styles.rightAddon,
								addonsHideMobile && styles.addonsHideMobile
							)}
						>
							{rightAddon}
						</span>
					)}
				</Link>
			)
		}

		return (
			<button
				className={clsx(
					styles.button,
					styles[size],
					styles[view],
					block && styles.block,
					disabled && styles.disabled,
					withoutContent && styles.withoutContent,
					addonsHideMobile && styles.buttonWithoutAddons,
					withoutBorder && styles.withoutBorder,
					className && className
				)}
				type={type}
				disabled={disabled}
				onClick={onClick}
			>
				{leftAddon && (
					<span
						className={clsx(
							styles.leftAddon,
							addonsHideMobile && styles.addonsHideMobile
						)}
					>
						{leftAddon}
					</span>
				)}
				{children}
				{rightAddon && (
					<span
						className={clsx(
							styles.rightAddon,
							addonsHideMobile && styles.addonsHideMobile
						)}
					>
						{rightAddon}
					</span>
				)}
			</button>
		)
	}

export default Button
