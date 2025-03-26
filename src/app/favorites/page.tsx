'use client'

import BlankContent from '@components/modules/common/blank-content/BlankContent'
import FavoriteItem from '@components/modules/favorites/favorite-item/FavoriteItem'
import Tags from '@components/ui/tags/Tags'
import emptyFavoritesImage from '@public/img/favorites/empty-favorites.svg'

import styles from './page.module.scss'

const FAVORITES = [
	{
		id: '1001',
		available: false,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1001',
		available: false,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1001',
		available: false,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1001',
		available: false,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1001',
		available: false,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	}
]

const POPULAR = [
	{
		id: '1001',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1002',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1003',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	},
	{
		id: '1004',
		available: true,
		img: '/img/grid-machines/M3.png',
		favorites: false,
		comparison: false,
		name: 'Accessories for CNC Router Machines',
		code: 'Spindle SDK GDZ120x103-4.5',
		price: '$5000'
	}
]

export default function Page() {
	return (
		<main className={styles.page}>
			<div className={styles.title}>Favorites</div>
			{FAVORITES.length === 0 ? (
				<>
					<BlankContent
						image={emptyFavoritesImage}
						title={
							<>
								Favorites list is empty <br /> at the moment
							</>
						}
						description={
							<>
								Visit the Home page and explore our catalog to <br /> select
								items and add them to your favorites.
							</>
						}
						action='Go to the Home page'
						onClick={() => {}}
					/>
					<div className={styles.popular}>
						<div className={styles.popularTitle}>Popular items</div>
						<div className={styles.content}>
							{POPULAR.map(item => (
								<FavoriteItem
									key={item.id}
									props={item}
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<>
					<Tags
						size='l'
						selected={[]}
						items={[
							{ content: 'All', id: '01' },
							{ content: 'Laser machines', id: '02' },
							{ content: 'CNC Routers', id: '03' },
							{ content: 'Laser markers', id: '04' },
							{ content: 'Metal Cutters', id: '05' },
							{ content: 'Laser welding', id: '06' },
							{ content: 'Laser cleaning', id: '07' },
							{ content: 'Laser pipe cutting', id: '08' }
						]}
						onClick={selected => {}}
					/>
					<div className={styles.content}>
						{FAVORITES.map(item => (
							<FavoriteItem
								key={item.id}
								props={item}
							/>
						))}
					</div>
				</>
			)}
		</main>
	)
}
