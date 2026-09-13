'use client'

import { FC } from 'react'

import styles from './AdvantagesSection.module.scss'

const ADVANTAGES = [
	{
		number: '01',
		title: 'Tailored Machine Selection',
		description: 'We audit your production materials and recommend the optimal bed size, spindle or laser power, and rotary accessories to maximize throughput without overpaying.'
	},
	{
		number: '02',
		title: 'Professional Operator Training',
		description: 'Our engineers conduct hands-on training for your team, covering safety standards, CAM software configuration, and routine machine maintenance.'
	},
	{
		number: '03',
		title: '24/7 Technical Support',
		description: 'Direct access to certified technical specialists, instant spare parts availability in local warehouses, and lifelong firmware & software updates.'
	}
]

export const AdvantagesSection: FC = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.leadBox}>
					<span className={styles.tag}>Why choose Wattsan</span>
					<h2 className={styles.mainHeading}>
						Wattsan selects and customizes CNC equipment for your exact production tasks. We train your personnel and provide dedicated technical support at every step.
					</h2>
				</div>

				<div className={styles.cardsGrid}>
					{ADVANTAGES.map(adv => (
						<div key={adv.number} className={styles.advCard}>
							<div className={styles.numberBadge}>{adv.number}</div>
							<h3 className={styles.cardTitle}>{adv.title}</h3>
							<p className={styles.cardDesc}>{adv.description}</p>
						</div>
					))}
				</div>

				<div className={styles.formulaBanner}>
					<div className={styles.formulaText}>
						<span className={styles.formulaPart}>Machines</span>
						<span className={styles.formulaSymbol}>+</span>
						<span className={styles.formulaPart}>Advanced Software</span>
						<span className={styles.formulaSymbol}>=</span>
						<span className={styles.formulaHighlight}>Creations Brought to Life</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdvantagesSection
