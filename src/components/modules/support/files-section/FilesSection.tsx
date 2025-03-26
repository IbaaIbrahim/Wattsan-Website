import PlateFoldable from '@components/modules/common/plate-foldable/PlateFoldable'
import downloadIcon from '@public/img/icons/download.svg'
import autoCadIcon from '@public/img/support/autocad-icon.png'
import Image from 'next/image'
import Link from 'next/link'

import styles from './FilesSection.module.scss'

const FilesSection = ({ info }) => {
	return (
		<PlateFoldable
			key={info.name}
			wrapperBorder={false}
			className={styles.plate}
			headerClassName={styles.header}
			title={
				<div className={styles.headerWrapper}>
					<div className={styles.image}>
						<Image
							src={autoCadIcon}
							alt=''
							fill={true}
						/>
					</div>
					<div>
						<div className={styles.title}>{info.name}</div>
						<div className={styles.description}>{info.description}</div>
					</div>
				</div>
			}
			content={
				<div className={styles.content}>
					{info.links.map(link => (
						<div
							key={link.id}
							className={styles.linkWrapper}
						>
							<div className={styles.linkImage}>
								<Image
									src={link.icon}
									alt=''
									fill={true}
								/>
							</div>
							<div>
								<div className={styles.linkName}>{link.name}</div>
								<div className={styles.linkUrl}>{link.url}</div>
							</div>
							<Link
								className={styles.link}
								href={link.url}
							>
								<Image
									src={downloadIcon}
									alt=''
								/>
							</Link>
						</div>
					))}
				</div>
			}
			defaultFolded={true}
			foldable={true}
		/>
	)
}

export default FilesSection
