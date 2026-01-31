import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import cn from './Typography.module.scss'

export const Typography: FC<{
	className?: string
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
	size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'
	weight?: 'bold' | 'semi-bold' | 'regular'
	discolored?: boolean
	align?: 'left' | 'center' | 'right'
	children: ReactNode | any
	style?: React.CSSProperties
}> = ({
	className,
	tag = 'p',
	size,
	weight = 'semi-bold',
	discolored = false,
	align = 'left',
	children,
	style
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
				style={style}
			>
				{children}
			</Component>
		)
	}
