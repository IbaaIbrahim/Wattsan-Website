'use client'

import EquipmentInfo from '@components/modules/equipment/equipment-info/EquipmentInfo'
import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import checkEquipmentImage from '@public/img/check-equipment/check-equipment-image.svg'
import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.scss'

const INFO = {
	image: '/img/grid-machines/M3.png',
	id: '1001',
	type: 'Laser machines',
	name: 'Laser Cutting Engraving Machine',
	code: '6040 ST',
	status: 'modified',
	serialNumber: 'YIO795U630493G83',
	productionDate: '23.01.2023',
	specificationPdf: '/',
	repairEndDate: '23.01.2023',
	currentStatus: 'Is used',
	historyDescription:
		'The equipment is operational and complies with specifications.',
	history: [
		{
			type: 'Repair',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		},
		{
			type: 'Technical support',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		},
		{
			type: 'Technical support',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		},
		{
			type: 'Repair',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		},
		{
			type: 'Delivery',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		},
		{
			type: 'Production',
			date: '23.01.2023',
			issue:
				'Safety sensor intermittently triggering, causing work interruptions.',
			performedTasks:
				'Safety sensor replacement, thorough inspection, and testing conducted.'
		}
	]
}

export default function Page() {
	return (
		<div>
			<div className={styles.header}>
				<div>
					<div className={styles.form}>
						<div className={styles.title}>Check equipment</div>
						<div className={styles.description}>
							Here you'll find all the information about your equipment: its
							history, warranty details, production date — everything at your
							fingertips for convenience.
						</div>
						<Link
							className={styles.link}
							href='/'
						>
							Discover more
						</Link>
						<div className={styles.fields}>
							<Input
								label='Equipment serial number'
								placeholder='EMAI'
								hasBorder={false}
							/>
							<Button
								view='red'
								size='l'
								block={true}
							>
								Find equipment
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.imageWrapper}>
					<div className={styles.image}>
						<Image
							src={checkEquipmentImage}
							alt=''
							fill={true}
						/>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.subtitle}>Equipment info</div>
				<EquipmentInfo info={INFO} />
			</div>
		</div>
	)
}
