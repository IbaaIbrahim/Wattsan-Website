import Button from '@components/ui/button/Button'
import Tooltip from '@components/ui/tooltip/Tooltip'
import compareIcon from '@public/img/icons/compare-icon.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import styles from './FavoriteItem.module.scss'

const FavoriteItem: FC<any> = ({ props }) => {
	return (
		<div className={clsx(styles.card, !props.available && styles.unavailable)}>
			<div className={styles.image}>
				<Image
					src={props.img}
					fill={true}
					alt=''
				/>
				<div className={styles.status}>
					<Tooltip
						placement='bottom'
						trigger='hover'
						content={
							<div className={styles.tooltip}>
								{props.comparison
									? 'Remove from comparison'
									: 'Add to comparison'}
							</div>
						}
					>
						<button
							className={styles.action}
							onClick={() => props.onToggleCompare(props.id)}
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
								{props.favorites ? 'Remove from favorites' : 'Add to favorites'}
							</div>
						}
					>
						<button
							className={styles.action}
							disabled={!props.available}
							onClick={() => props.onToggleFavorites(props.id)}
						>
							<Image
								src={favoritesIcon}
								alt=''
							/>
						</button>
					</Tooltip>
				</div>
			</div>
			<div className={styles.name}>{props.name}</div>
			<div className={styles.code}>
				<div className={styles.overflow}>{props.code}</div>
			</div>
			<div className={styles.price}>{props.price}</div>
			<Button
				className={styles.button}
				size='l'
				view={props.available ? 'red' : 'blue'}
				block={true}
				disabled={!props.available}
				onClick={props.onClick}
			>
				{props.available ? 'Add to basket' : 'Out of stock'}
			</Button>
		</div>
	)
}

export default FavoriteItem
