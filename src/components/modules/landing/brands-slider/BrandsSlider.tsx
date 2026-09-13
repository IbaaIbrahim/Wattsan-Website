'use client'

import { FC } from 'react'

import styles from './BrandsSlider.module.scss'

const BRANDS = [
	{ name: 'Ruida', desc: 'Motion controllers' },
	{ name: 'Reci', desc: 'Laser tubes' },
	{ name: 'Raycus', desc: 'Fiber laser sources' },
	{ name: 'Leadshine', desc: 'Steppers & drivers' },
	{ name: 'HIWIN', desc: 'Linear guide rails' },
	{ name: 'Schneider', desc: 'Electrical safety' },
	{ name: 'Yaskawa', desc: 'Servo systems' },
	{ name: 'S&A Teyu', desc: 'Industrial chillers' }
]

export const BrandsSlider: FC = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>
					Partnership with leading brands in the CNC industry
				</h2>
				<div className={styles.brandsGrid}>
					{BRANDS.map(brand => (
						<div key={brand.name} className={styles.brandCard}>
							<span className={styles.brandName}>{brand.name}</span>
							<span className={styles.brandDesc}>{brand.desc}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default BrandsSlider
