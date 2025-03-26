'use client'

import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, ReactNode, useState } from 'react'

import styles from './PlateFoldable.module.scss'

const PlateFoldable: FC<{
	className?: string
	headerClassName?: string
	foldable?: boolean
	defaultFolded?: boolean
	wrapperBorder?: boolean
	title: ReactNode
	content: ReactNode
}> = ({
	className,
	headerClassName,
	foldable = false,
	defaultFolded = false,
	wrapperBorder = true,
	title,
	content
}) => {
	const [folded, setFolded] = useState<boolean>(defaultFolded)

	return (
		<div
			className={clsx(
				styles.wrapper,
				foldable && styles.foldable,
				wrapperBorder && styles.wrapperBorder,
				className && className
			)}
		>
			<button
				className={clsx(
					styles.header,
					headerClassName && headerClassName,
					folded && styles.headerFolded
				)}
				onClick={() => (foldable ? setFolded(!folded) : () => {})}
			>
				<div className={styles.title}>{title}</div>
				<div className={clsx(styles.icon, folded && styles.iconFolded)}>
					<Image
						src={rightArrowIcon}
						alt=''
					/>
				</div>
			</button>
			<div
				className={clsx(styles.content, folded && foldable && styles.folded)}
			>
				<div className={styles.innerContent}>{content}</div>
			</div>
		</div>
	)
}

export default PlateFoldable
