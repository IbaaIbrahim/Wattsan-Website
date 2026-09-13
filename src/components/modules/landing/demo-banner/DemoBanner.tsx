'use client'

import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { FC } from 'react'

import styles from './DemoBanner.module.scss'

export const DemoBanner: FC = () => {
	const handleOpenModal = () => {
		modalsStore.set.open(MODALS.requestCallback, {
			title: 'Request a Live Demonstration',
			subtitle: 'Experience our machines live before making a purchase.'
		})
	}

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.banner}>
					<div className={styles.contentCol}>
						<span className={styles.tag}>Demonstration</span>
						<h2 className={styles.title}>Online or Offline?</h2>
						<p className={styles.description}>
							We demonstrate machine operation in any convenient format: visit our showroom in one of 50+ partner cities or join an interactive high-definition video session tailored to your production materials.
						</p>
						<div className={styles.actions}>
							<Button
								view='blue'
								size='l'
								onClick={handleOpenModal}
							>
								Schedule demonstration
							</Button>
							<span className={styles.freeHint}>✓ Free test on your materials</span>
						</div>
					</div>

					<div className={styles.imageCol}>
						<div className={styles.imageCard}>
							<Image
								src='/img/grid-machines/icon-for-mini-cabin-equipment.png'
								alt='Live Demo'
								width={380}
								height={240}
								className={styles.image}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DemoBanner
