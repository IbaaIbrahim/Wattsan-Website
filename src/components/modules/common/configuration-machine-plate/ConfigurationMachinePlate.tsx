import Button from '@components/ui/button/Button'
import Tooltip from '@components/ui/tooltip/Tooltip'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './ConfigurationMachinePlate.module.scss'

const STATUS_COLOR_MAP = {
	Ordered: 'green',
	'In process': 'yellow',
	Deleted: 'red'
}

const ConfigurationMachinePlate: FC<{
	item: {
		id: string
		image: string
		name: string
		status: string
		type: string
		code: string
		price: string
	}
	onViewConfiguration: () => void
	onViewSpecification: () => void
	onEdit: (id: string) => void
	onDownload: (id: string) => void
	onDuplicate: (id: string) => void
	onDelete: (id: string) => void
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
					src={item.image}
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
					className={clsx(styles.status, styles[STATUS_COLOR_MAP[item.status]])}
				>
					{item.status}
				</div>
				<div className={styles.name}>{item.name}</div>
				<div className={styles.code}>
					{item.code}&nbsp;<div className={styles.type}>{item.type}</div>
				</div>
				<div className={styles.price}>{item.price}</div>
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
