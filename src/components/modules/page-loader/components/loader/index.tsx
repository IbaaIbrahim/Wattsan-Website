import cn from 'clsx'
import { FC } from 'react'
import { v4 } from 'uuid'

import styles from './styles.module.scss'

export const Loader: FC<{ className?: string; size?: 16 | 40 }> = ({
	className,
	size = 16
}) => {
	const radius = size / 2 - 1
	const rotationAngle /* deg */ = Math.ceil(
		(Math.asin(1 / radius) * 180) / Math.PI
	)
	const gap /* deg */ = 90
	const pathLength /* deg */ = 360
	const strokeDasharray = `${pathLength - gap - rotationAngle} ${gap + rotationAngle}`
	const gradient = `conic-gradient(from ${rotationAngle}deg, transparent ${
		gap - rotationAngle * 2
	}deg, currentColor)`

	const uniqId = v4()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={`0 0 ${size} ${size}`}
			style={{ height: size, width: size }}
			className={cn(styles.spinner, className)}
		>
			<defs>
				<mask id={uniqId}>
					<circle
						cx='50%'
						cy='50%'
						r={radius}
						strokeWidth={2}
						strokeLinecap='round'
						stroke='#fff'
						strokeDashoffset={-rotationAngle}
						strokeDasharray={strokeDasharray}
						pathLength={pathLength}
					/>
				</mask>
			</defs>
			<foreignObject
				x='0'
				y='0'
				width={size}
				height={size}
				mask={`url(#${uniqId})`}
			>
				<div
					className={styles.gradient}
					style={{ backgroundImage: gradient }}
				/>
			</foreignObject>
		</svg>
	)
}
