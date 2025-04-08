import Button from '@components/ui/button/Button'
import Tooltip from '@components/ui/tooltip/Tooltip'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './ConfigurationMachinePlate.module.scss'
import _ from 'lodash'
import { IConfiguration } from '@my-types/configurations'

const STATUS_MAP = {
	1: {title: "In Process", color: 'yellow'},
	2: {title: "Ordered", color: 'green'},
	3: {title: "Deleted", color: 'red'}
}

const ConfigurationMachinePlate: FC<{
	item: IConfiguration
	onViewConfiguration: () => void
	onViewSpecification: () => void
	onEdit: (id: string | number) => void
	onDownload: (id: string | number) => void
	onDuplicate: (id: string | number) => void
	onDelete: (id: string | number) => void
}> = ({
	item,
	onViewConfiguration,
	onViewSpecification,
	onEdit,
	onDelete,
	onDownload,
	onDuplicate
}) => {
	const [show, setShow] = useState<boolean>(false)

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={_.get(item, `fileManger.url`)}
					fill={true}
					alt=''
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.menuWrapper}>
					<Tooltip
						opened={show}
						onToggle={setShow}
						placement='left-start'
						content={
							<div>
								<button
									className={styles.menuButton}
									onClick={() => onEdit(item.id)}
								>
									Edit
								</button>
								<button
									className={styles.menuButton}
									onClick={() => onDownload(item.id)}
								>
									Download
								</button>
								<button
									className={styles.menuButton}
									onClick={() => onDuplicate(item.id)}
								>
									Duplicate
								</button>
								<button
									className={styles.menuButton}
									onClick={() => onDelete(item.id)}
								>
									Delete
								</button>
							</div>
						}
					>
						<button
							className={styles.menu}
							onClick={() => setShow(!show)}
						>
							<div />
						</button>
					</Tooltip>
				</div>
				<div
					className={clsx(styles.status, _.get(styles, _.get(STATUS_MAP, `${item.status}.color`)))}
				>
					{_.get(STATUS_MAP, `${item.status}.title`)}
				</div>
				<div className={styles.name}>{item.configurationName}</div>
				<div className={styles.code}>
					{/*{item?.workAreaChar?.name}&nbsp;<div className={styles.type}>{item.type}</div>*/}
					{item?.workAreaChar?.name}&nbsp;
				</div>
				<div className={styles.price}>${item.price}</div>
				<div className={styles.actions}>
					<Button
						size='l'
						view='black'
						onClick={onViewConfiguration}
					>
						View configuration
					</Button>
					<Button
						size='l'
						view='bordered'
						onClick={onViewSpecification}
					>
						View Specification
					</Button>
				</div>
			</div>
			<div className={styles.mobileActions}>
				<Button
					size='l'
					view='black'
					onClick={onViewConfiguration}
				>
					View configuration
				</Button>
				<Button
					size='l'
					view='bordered'
					onClick={onViewSpecification}
				>
					View Specification
				</Button>
			</div>
		</div>
	)
}

export default ConfigurationMachinePlate
