import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import cn from './Typography.module.scss'

export const Typography: FC<{
	className?: string
	tag?: 'h1' | 'h2' | 'h3' | 'p'
	size?: 'xl' | 'l' | 'm' | 's'
	weight?: 'semi-bold' | 'regular'
	discolored?: boolean
	align?: 'left' | 'center' | 'right'
	children: ReactNode | any
}> = ({
	className,
	tag = 'p',
	size,
	weight = 'semi-bold',
	discolored = false,
	align = 'left',
	children
}) => {
	const Component = tag

	return (
		<Component
			className={clsx(
				cn.typography,
				cn[size],
				cn[weight],
				cn[tag],
				cn[align],
				discolored && cn.discolored,
				className
			)}
		>
			{children}
		</Component>
	)
}
