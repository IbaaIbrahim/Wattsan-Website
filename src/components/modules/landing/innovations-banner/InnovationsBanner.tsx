'use client'

import Button from '@components/ui/button/Button'
import { FC } from 'react'

import styles from './InnovationsBanner.module.scss'

const INNOVATIONS = [
	{ label: 'Triple-Point Optical Calibration' },
	{ label: 'Reinforced Bed Geometry' },
	{ label: 'Active Coolant Cutoff Sensor' },
	{ label: 'Multi-Chamber Smoke Extraction' }
]

export const InnovationsBanner: FC = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.banner}>
					<div className={styles.overlay} />
					<div className={styles.content}>
						<span className={styles.tag}>Engineering Leadership</span>
						<h2 className={styles.title}>
							World-First Innovations: <br />
							Simpler, Safer & More Efficient
						</h2>

						<div className={styles.pillsRow}>
							{INNOVATIONS.map(item => (
								<div key={item.label} className={styles.pill}>
									<span className={styles.pillCheck}>✓</span>
									<span>{item.label}</span>
								</div>
							))}
						</div>

						<p className={styles.description}>
							Every Wattsan machine is designed from the ground up for industrial longevity and operator safety. Clear documentation and calibrated zero-points allow operators to set up and start precision manufacturing in hours.
						</p>

						<div className={styles.actions}>
							<Button
								href='/configurator'
								view='blue'
								size='l'
							>
								Configure your machine
							</Button>
							<Button
								href='/product/laser-co2'
								view='bordered'
								size='l'
								className={styles.secondaryBtn}
							>
								View machine specs
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default InnovationsBanner
