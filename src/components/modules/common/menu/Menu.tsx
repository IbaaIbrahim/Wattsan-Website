import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import styles from './Menu.module.scss'

const Menu: FC<{
	items: { icon: string; href: string; content: string }[]
	hiddenText: boolean
}> = ({ items, hiddenText }) => {
	const pathname = usePathname()

	return (
		<div className={styles.menu}>
			{items.map(({ icon, href, content }) => {
				return (
					<Link
						key={content}
						className={clsx(
							styles.item,
							pathname.includes(href) && styles.active
						)}
						href={href}
					>
						<Image
							className={styles.icon}
							src={icon}
							alt=''
						/>
						<div className={clsx(styles.text, hiddenText && styles.textHidden)}>
							{content}
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default Menu
