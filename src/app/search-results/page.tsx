'use client'

import { getAllProducts, formatProductModelName } from '@api/product'
import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'

import styles from './page.module.scss'

interface SearchItem {
	id: string | number
	name: string
	code: string
	price: string | number
	imgSrc: string
	url: string
}

const FALLBACK_RESULTS: SearchItem[] = [
	{
		id: '1',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000',
		imgSrc: '/img/grid-machines/icon-for-mini-equipment.png',
		url: '/product/1'
	},
	{
		id: '2',
		name: 'Laser Cutting Engraving Machine',
		code: '1610 ST',
		price: '$7200',
		imgSrc: '/img/grid-machines/icon-for-mini-equipment.png',
		url: '/product/2'
	},
	{
		id: '3',
		name: 'CNC Milling Machine',
		code: 'A1 1325',
		price: '$9500',
		imgSrc: '/img/grid-machines/icon-for-mini-equipment.png',
		url: '/product/cnc-router'
	},
	{
		id: '4',
		name: 'Fiber Laser Marking Machine',
		code: 'FL TT',
		price: '$3800',
		imgSrc: '/img/grid-machines/icon-for-mini-equipment.png',
		url: '/product/laser-co2'
	}
]

const SearchContent = () => {
	const searchParams = useSearchParams()
	const initialQuery = searchParams.get('search') || ''

	const [search, setSearch] = useState<string>(initialQuery)
	const [products, setProducts] = useState<SearchItem[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setSearch(initialQuery)
	}, [initialQuery])

	useEffect(() => {
		let isMounted = true
		getAllProducts()
			.then((items: any[]) => {
				if (!isMounted) return
				if (Array.isArray(items) && items.length > 0) {
					const mapped: SearchItem[] = items.map(p => {
						const nameLower = (p.name || '').toLowerCase()
						const isRouter = nameLower.includes('a1') || nameLower.includes('m1') || nameLower.includes('router') || nameLower.includes('1325')
						const isMarker = nameLower.includes('fl') || nameLower.includes('marker') || nameLower.includes('tt')
						const categoryTitle =
							p.categoryName ||
							p.seriesName ||
							(isMarker
								? 'Fiber Laser Marking Machine'
								: isRouter
								? 'CNC Milling Router Machine'
								: 'Laser Cutting Engraving Machine')

						return {
							id: p.id,
							name: categoryTitle,
							code: p.name || formatProductModelName(p.name) || p.modelName || 'Wattsan Machine',
							price: p.price
								? `$${Number(p.price).toLocaleString()}`
								: p.startPrice
								? `from $${Number(p.startPrice).toLocaleString()}`
								: '$5,000',
							imgSrc: p.logo?.src || p.image || '/img/grid-machines/icon-for-mini-equipment.png',
							url: `/product/${p.id}`
						}
					})
					setProducts(mapped)
				} else {
					setProducts(FALLBACK_RESULTS)
				}
			})
			.catch(() => {
				if (isMounted) {
					setProducts(FALLBACK_RESULTS)
				}
			})
			.finally(() => {
				if (isMounted) setLoading(false)
			})

		return () => {
			isMounted = false
		}
	}, [])

	const filteredResults = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return products

		return products.filter(
			item =>
				item.name.toLowerCase().includes(q) ||
				item.code.toLowerCase().includes(q) ||
				String(item.price).toLowerCase().includes(q)
		)
	}, [products, search])

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.headerArea}>
					<h1 className={styles.title}>Search results</h1>
					<FormAutocomplete
						className={styles.searchForm}
						value={search}
						name='search'
						placeholder='Search items'
						size='l'
						onChange={setSearch}
					/>
					{search && (
						<div className={styles.countLabel}>
							Found {filteredResults.length} {filteredResults.length === 1 ? 'item' : 'items'} for &ldquo;{search}&rdquo;
						</div>
					)}
				</div>

				<div className={styles.results}>
					{loading ? (
						<div className={styles.loadingState}>
							<div className={styles.spinner} />
							<span>Searching catalogue...</span>
						</div>
					) : filteredResults.length > 0 ? (
						filteredResults.map(item => (
							<div key={item.id} className={styles.cardItem}>
								<div className={styles.imageBox}>
									<Image
										src={item.imgSrc}
										alt={item.code}
										width={80}
										height={80}
										className={styles.image}
									/>
								</div>
								<div className={styles.infoCol}>
									<div className={styles.name}>{item.name}</div>
									<div className={styles.code}>{item.code}</div>
									<div className={styles.price}>{item.price}</div>
								</div>
								<div className={styles.actionCol}>
									<Link href={item.url} className={styles.viewBtn}>
										View item
									</Link>
								</div>
							</div>
						))
					) : (
						<div className={styles.emptyState}>
							<div className={styles.emptyTitle}>No items found</div>
							<p className={styles.emptyDesc}>
								We couldn&rsquo;t find anything matching &ldquo;{search}&rdquo;. Try checking for typos or searching for general categories like &ldquo;laser&rdquo;, &ldquo;router&rdquo;, or &ldquo;cutter&rdquo;.
							</p>
							<Link href='/configurator' className={styles.browseBtn}>
								Browse Configurator
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const SearchPage = () => {
	return (
		<Suspense
			fallback={
				<div className={styles.page}>
					<div className={styles.loadingState}>
						<div className={styles.spinner} />
						<span>Loading search...</span>
					</div>
				</div>
			}
		>
			<SearchContent />
		</Suspense>
	)
}

export default SearchPage
