'use client'

import PlateFoldable from '@components/modules/common/plate-foldable/PlateFoldable'
import Button from '@components/ui/button/Button'
import { useMatchMedia } from '@hooks/useMatchMedia'
import Image from 'next/image'

import styles from './EquipmentInfo.module.scss'

const EquipmentInfo = ({ info }) => {
	const [isMobile] = useMatchMedia('max-width: 768px')

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.infoContent}>
					<div className={styles.itemImage}>
						<Image
							src={info.image}
							fill={true}
							alt=''
						/>
					</div>
					<div>
						<div className={styles.infoTitle}>{info.name}</div>
						<div className={styles.infoCode}>
							{info.code}
							<div className={styles.infoStatus}>&nbsp;{info.status}</div>
						</div>
						<div className={styles.productionInfo}>
							<div className={styles.productionTitle}>Serial number</div>
							<div className={styles.productionDescription}>
								{info.serialNumber}
							</div>
							<div className={styles.productionTitle}>Production date</div>
							<div className={styles.productionDescription}>
								{info.productionDate}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.actions}>
					<Button
						size='l'
						view='red'
					>
						Add to My equipment
					</Button>
					<Button
						size='l'
						view='bordered'
					>
						Download PDF
					</Button>
				</div>
				<div className={styles.guaranteeWrapper}>
					<div className={styles.guaranteeTitle}>Service guarantee</div>
					<div className={styles.guaranteeDescription}>
						This equipment comes with a maintenance and repair warranty. We
						provide not only repair services but also online support and
						training.
					</div>
					<PlateFoldable
						className={styles.servicePlate}
						title={<div className={styles.serviceTitle}>Online support</div>}
						content={
							<>
								<div className={styles.eventDescription}>
									Our team is ready to provide consultations on your equipment
									via phone or online. Get expert guidance and support tailored
									to your needs.
								</div>
								<Button
									className={styles.serviceButton}
									size='l'
									view='black'
								>
									Explore online support
								</Button>
							</>
						}
						defaultFolded={true}
						foldable={isMobile ?? false}
					/>
					<PlateFoldable
						className={styles.servicePlate}
						title={
							<div className={styles.serviceTitle}>Repairs and maintenance</div>
						}
						content={
							<>
								<div className={styles.eventDescription}>
									We offer warranty repairs and regular technical maintenance to
									ensure optimal performance and resolve any issues.
								</div>
								<Button
									className={styles.serviceButton}
									size='l'
									view='black'
								>
									Request repair
								</Button>
							</>
						}
						defaultFolded={true}
						foldable={isMobile ?? false}
					/>
					<PlateFoldable
						className={styles.servicePlate}
						title={<div className={styles.serviceTitle}>Online training</div>}
						content={
							<>
								<div className={styles.eventDescription}>
									For owners of our equipment, we provide the opportunity to
									undergo online training and download the necessary drivers and
									files.
								</div>
								<Button
									className={styles.serviceButton}
									size='l'
									view='black'
								>
									Go to online training
								</Button>
							</>
						}
						defaultFolded={true}
						foldable={isMobile ?? false}
					/>
				</div>
			</div>
			<div className={styles.historyWrapper}>
				<div className={styles.historyTitle}>Equipment history</div>
				<div className={styles.events}>
					<PlateFoldable
						foldable={true}
						defaultFolded={false}
						className={styles.eventIconCurrent}
						title={
							<>
								{info.currentStatus}
								<div className={styles.eventStatus}>&nbsp;Current status</div>
							</>
						}
						content={
							<div className={styles.eventDescription}>
								{info.historyDescription}
								The equipment is operational and complies with specifications.
							</div>
						}
					/>
					{info.history.map((event, index) => (
						<PlateFoldable
							key={index}
							className={styles.eventIcon}
							foldable={true}
							defaultFolded={true}
							title={
								<>
									{event.type}
									<div className={styles.eventStatus}>&nbsp;{event.date}</div>
								</>
							}
							content={
								<>
									<div className={styles.eventSubtitle}>Issue description</div>
									<div className={styles.eventDescription}>{event.issue}</div>
									<div className={styles.eventSubtitle}>Performed tasks</div>
									<div className={styles.eventDescription}>
										{event.performedTasks}
									</div>
								</>
							}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default EquipmentInfo
