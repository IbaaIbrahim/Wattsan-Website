import Button from '@components/ui/button/Button'
import { TPopularItem } from '@my-types/basket'
import comparisonIcon from '@public/img/icons/comparison.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PopularItem.module.scss'

const PopularItem: FC<{ item: TPopularItem }> = ({ item }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={item.image}
					fill={true}
					alt=''
				/>
				<div className={styles.actions}>
					<button className={styles.action}>
						<Image
							src={comparisonIcon}
							alt=''
						/>
					</button>
					<button className={styles.action}>
						<Image
							src={favoritesIcon}
							alt=''
						/>
					</button>
				</div>
			</div>
			<div className={styles.name}>{item.name}</div>
			<div className={styles.code}>
				{item.code}
				<div className={styles.modification}>{item.modification}</div>
			</div>
			<div className={styles.price}>${item.price}</div>
			<Button
				className={styles.addToBasket}
				view='red'
				size='l'
			>
				Add to basket
			</Button>
		</div>
	)
}

export default PopularItem
