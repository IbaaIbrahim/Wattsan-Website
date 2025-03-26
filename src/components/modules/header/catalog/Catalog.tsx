'use client'

import Button from '@components/ui/button/Button'
import accessories from '@public/img/catalog/accessories.png'
import cncRoutes from '@public/img/catalog/cnc-routes.png'
import hydraulicPressBrakes from '@public/img/catalog/hydraulic-press-brakes.png'
import laserCleaning from '@public/img/catalog/laser-cleaning.png'
import laserMachines from '@public/img/catalog/laser-machines.png'
import laserMarkers from '@public/img/catalog/laser-markers.png'
import laserPipeCutting from '@public/img/catalog/laser-pipe-cutting.png'
import laserWelding from '@public/img/catalog/laser-welding.png'
import metalCutters from '@public/img/catalog/metall-cutters.png'
import promo from '@public/img/catalog/promo.png'
import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import styles from './Catalog.module.scss'

const MENU = [
	{ id: '01', image: laserMachines, content: 'Laser machines' },
	{ id: '02', image: cncRoutes, content: 'CNC Routers' },
	{ id: '03', image: laserMarkers, content: 'Laser markers' },
	{ id: '04', image: metalCutters, content: 'Metal Cutters' },
	{ id: '05', image: laserWelding, content: 'Laser welding' },
	{ id: '06', image: laserCleaning, content: 'Laser cleaning' },
	{ id: '07', image: laserPipeCutting, content: 'Laser pipe cutting' },
	{ id: '08', image: hydraulicPressBrakes, content: 'Hydraulic press brakes' }
]

const RESULT = [
	{ name: '400x400mm', id: '01' },
	{ name: '600x900mm', id: '02' },
	{ name: '1300x1300mm', id: '03' },
	{ name: '1600x1600mm', id: '04' },
	{ name: '1300x2500mm', id: '05' },
	{ name: '2000x3000mm', id: '07' },
	{ name: '2000x4000mm', id: '08' },
	{ name: '2000x6000mm', id: '09' }
]

const Catalog = () => {
	const [equipment, setEquipment] = useState(null)

	return (
		<div
			className={clsx(styles.wrapper, equipment !== null && styles.wrapperFull)}
		>
			<div
				className={clsx(
					styles.equipmentMenu,
					equipment && styles.equipmentMenuSelected
				)}
			>
				{MENU.map(({ id, image, content }) => (
					<button
						className={clsx(
							styles.equipmentButton,
							id === equipment && styles.equipmentButtonActive
						)}
						key={id}
						onClick={() => setEquipment(id)}
					>
						<div className={styles.equipmentButtonImage}>
							<Image
								src={image}
								alt=''
								fill={true}
							/>
						</div>
						{content}
						<Image
							src={rightArrowIcon}
							alt=''
						/>
					</button>
				))}
				<div className={styles.divider} />
				<button
					className={clsx(
						styles.equipmentButton,
						'09' === equipment && styles.equipmentButtonActive
					)}
					onClick={() => setEquipment('09')}
				>
					<div className={styles.equipmentButtonImage}>
						<Image
							src={accessories}
							alt=''
							fill={true}
						/>
					</div>
					Accessories
					<Image
						src={rightArrowIcon}
						alt=''
					/>
				</button>
			</div>
			{equipment !== null && (
				<>
					<div className={styles.content}>
						<div className={styles.contentTitle}>Work area</div>
						<div className={styles.equipmentTypes}>
							<div className={styles.tag}>All models</div>
							{RESULT.map(({ id, name }) => (
								<div
									key={id}
									className={styles.tag}
								>
									{name}
								</div>
							))}
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.promo}>
							<div className={styles.promoImage}>
								<Image
									src={promo}
									alt=''
									fill={true}
								/>
							</div>
							<div className={styles.promoTitle}>
								5% off Laser cutter engraver machine for wood till January end
							</div>
							<Button
								size='l'
								view='red'
								block={true}
							>
								View details
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Catalog
