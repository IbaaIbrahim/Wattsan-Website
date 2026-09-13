'use client'

import { FC, useEffect, useState } from 'react'
import PopularItem from '@components/modules/basket/popular-item/PopularItem'
import { TPopularItem } from '@my-types/basket'
import { getAllProducts, getClientConfigurations, getSellableCharacteristics } from '@api/product'
import styles from './InterestedProducts.module.scss'

interface InterestedProductsProps {
	className?: string
	products?: TPopularItem[]
}

const DEFAULT_INTERESTED: TPopularItem[] = [
	{
		id: 1,
		referenceId: 1,
		itemtype: 2,
		image: '/img/catalog/cnc-routes.png',
		name: 'Accessories for CNC Router Machines',
		code: 'Accessory 1',
		price: '2000'
	},
	{
		id: 2,
		referenceId: 2,
		itemtype: 2,
		image: '/img/catalog/cnc-routes.png',
		name: 'CNC Routers',
		code: 'Wattsan 0404 Mini',
		price: '3250'
	},
	{
		id: 3,
		referenceId: 3,
		itemtype: 2,
		image: '/img/catalog/cnc-routes.png',
		name: 'Laser machines',
		code: 'Wattsan 6090 LT',
		price: '7200'
	},
	{
		id: 4,
		referenceId: 4,
		itemtype: 2,
		image: '/img/catalog/cnc-routes.png',
		name: 'Laser markers',
		code: 'Wattsan FL TT',
		price: '4100'
	}
]

const InterestedProducts: FC<InterestedProductsProps> = ({
	className,
	products: initialProducts
}) => {
	const [dynamicProducts, setDynamicProducts] = useState<TPopularItem[]>(
		initialProducts && initialProducts.length > 0
			? initialProducts
			: DEFAULT_INTERESTED
	)

	useEffect(() => {
		if (initialProducts && initialProducts.length > 0) return

		const loadInterested = async () => {
			try {
				const [clientConfigs, prods, sellableChars] = await Promise.all([
					getClientConfigurations(),
					getAllProducts(),
					getSellableCharacteristics()
				])

				const items: TPopularItem[] = []

				if (clientConfigs && clientConfigs.length > 0) {
					const configItems = clientConfigs.slice(0, 2).map((c: any) => {
						const seriesName = c.series?.name || c.configurationName?.trim() || 'Configurator'
						const modelName = c.modelName ? `${c.modelName}` : ''
						const title = `${seriesName} ${modelName}`.trim()
						const imgUrl = c.fileManger?.url || c.fileManger?.thumbnail || '/img/grid-machines/M3.png'
						const priceVal = c.price && Number(c.price) > 0 ? c.price : 5000

						return {
							id: `conf-${c.id}`,
							referenceId: Number(c.id),
							itemtype: 1 as const,
							image: imgUrl,
							name: c.series?.name ? `${c.series.name} Series` : 'Configurator Build',
							code: title || 'Custom Configuration',
							price: Number(priceVal)
						}
					})
					items.push(...configItems)
				}

				if (prods && prods.length > 0) {
					const prodItems = prods.slice(0, 3).map((p: any) => {
						const priceVal = p.price && Number(p.price) > 0 ? p.price : (p.orderPrice || 5000)
						const imgUrl = p.attachments?.[0]?.fileManager?.url || '/img/catalog/cnc-routes.png'
						return {
							id: `prod-${p.id}`,
							referenceId: Number(p.id),
							itemtype: 2 as const,
							image: imgUrl,
							name: p.series?.name || 'CNC Routers',
							code: p.name || 'Wattsan Equipment',
							price: Number(priceVal)
						}
					})
					items.push(...prodItems)
				}

				if (sellableChars && sellableChars.length > 0) {
					const charItems = sellableChars.slice(0, 2).map((c: any) => {
						const charPrice = (c.price && Number(c.price) > 0) ? Number(c.price) : 2000
						const imgUrl = c.fileManager?.url || '/img/catalog/cnc-routes.png'
						return {
							id: `char-${c.id}`,
							referenceId: Number(c.id),
							itemtype: 3 as const,
							image: imgUrl,
							name: 'Accessories for CNC Router Machines',
							code: c.name ? `${c.name} ${c.unit || ''}`.trim() : 'Accessory',
							price: Number(charPrice)
						}
					})
					items.push(...charItems)
				}

				if (items.length > 0) {
					setDynamicProducts(items)
				}
			} catch (e) {
				console.error('Failed to load dynamic interested products', e)
			}
		}

		loadInterested()
	}, [initialProducts])

	return (
		<section className={`${styles.section} ${className || ''}`}>
			<h2 className={styles.title}>
				You might be <span className={styles.titleHighlight}>interested</span>
			</h2>
			<div className={styles.grid}>
				{dynamicProducts.map((item) => (
					<PopularItem key={item.id} item={item} />
				))}
			</div>
		</section>
	)
}

export default InterestedProducts
