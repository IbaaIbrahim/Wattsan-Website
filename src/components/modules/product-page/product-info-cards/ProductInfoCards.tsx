'use client'

import { FC } from 'react'
import ProductInfoCard, { MaterialColor } from './ProductInfoCard'
import clsx from 'clsx'

import styles from './ProductInfoCards.module.scss'

export type { MaterialColor }

export interface ProductInfoCardData {
	id: string
	title: string
	content?: string | number
	materials?: MaterialColor[]
	viewAllLink?: string
	onViewAllClick?: () => void
}

interface ProductInfoCardsProps {
	cards: ProductInfoCardData[]
	className?: string
}

const ProductInfoCards: FC<ProductInfoCardsProps> = ({ cards, className }) => {
	if (!cards || cards.length === 0) {
		return null
	}

	return (
		<div className={clsx(styles.cardsSection, className)}>
			{cards.map((card) => (
				<ProductInfoCard
					key={card.id}
					title={card.title}
					content={card.content}
					materials={card.materials}
					viewAllLink={card.viewAllLink}
					onViewAllClick={card.onViewAllClick}
				/>
			))}
		</div>
	)
}

export default ProductInfoCards
