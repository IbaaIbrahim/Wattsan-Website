import logoL from '@public/img/logos/logo-L.svg'
import logoM from '@public/img/logos/logo-M.svg'
import logoS from '@public/img/logos/logo-S.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { PAGES } from '../../../config/pages.url.config'

import styles from './Logo.module.scss'

const LOGOS = {
	s: logoS,
	m: logoM,
	l: logoL
}

const Logo: FC<{ className?: string; size?: 's' | 'm' | 'l' }> = ({
	className,
	size = 's'
}) => {
	return (
		<Link
			href={PAGES.catalog}
			className={clsx(styles.wrapper, styles[size], className)}
		>
			<Image
				src={LOGOS[size]}
				priority={true}
				alt='wattsan-logo'
			/>
		</Link>
	)
}

export default Logo
