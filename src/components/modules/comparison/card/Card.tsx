import Button from '@components/ui/button/Button'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import Tooltip from '@components/ui/tooltip/Tooltip'
import compareIcon from '@public/img/icons/compare-icon.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import styles from './Card.module.scss'

const Card: FC<{
	className: string
	selected: any
	options: { id: string; code: string; status: string }[]
	onSelect: (id: string) => void
	onRemoveCompare: (id: string) => void
	onToggleFavorites: (id: string) => void
}> = ({
	className,
	selected,
	options,
	onSelect,
	onRemoveCompare,
	onToggleFavorites
}) => {
	return (
		<div className={clsx(styles.card, className)}>
			<FormSelect
				bordered={true}
				placeholder='Select equipment'
				value={selected.id}
				options={options.map(({ id, code }) => ({ value: id, text: code }))}
				onSelect={id => onSelect(id)}
			/>
			{selected?.image && (
				<div className={styles.image}>
					<Image
						src={selected.image}
						alt=''
						fill={true}
					/>
					<div className={styles.toolltips}>
						<Tooltip
							placement='bottom'
							trigger='hover'
							content={
								<div className={styles.tooltip}>
									{selected.isCompared
										? 'Remove from comparison'
										: 'Add to comparison'}
								</div>
							}
						>
							<button
								className={styles.action}
								onClick={() => onRemoveCompare(selected.id)}
							>
								<Image
									src={compareIcon}
									alt=''
								/>
							</button>
						</Tooltip>
						<Tooltip
							placement='bottom'
							trigger='hover'
							content={
								<div className={styles.tooltip}>
									{selected.isFavorites
										? 'Remove from favorites'
										: 'Add to favorites'}
								</div>
							}
						>
							<button
								className={styles.action}
								onClick={() => onToggleFavorites(selected.id)}
							>
								<Image
									src={favoritesIcon}
									alt=''
								/>
							</button>
						</Tooltip>
					</div>
				</div>
			)}
			{selected?.name && (
				<>
					<div className={styles.name}>{selected.name}</div>
					<div className={styles.code}>
						{selected.code}
						<div className={styles.status}>&nbsp;{selected.status}</div>
					</div>
					<Button
						block={true}
						size='l'
						view='red'
						href='/'
					>
						View item
					</Button>
				</>
			)}
		</div>
	)
}

export default Card
