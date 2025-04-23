'use client'

import ItemPlate from '@components/modules/basket/item-plate/ItemPlate'
import Button from '@components/ui/button/Button'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import rightArrowSrc from '@public/img/icons/right-arrow.svg'
import { basketStore } from '@store/basket'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import styles from './SelectItems.module.scss'

const SelectItems = () => {
	const [showAll, setShowAll] = useState<boolean>(false)

	const positions = basketStore.use.positions()
	const allSelected = basketStore.use.allSelectedPositionsSelector()

	return (
		<div className={styles.wrapper}>
			<FormCheckbox
				className={styles.allItems}
				name='allItems'
				label='Select all items for checkout'
				selected={allSelected}
				onChange={basketStore.set.selectedAllPositions}
			/>
			<div className={styles.divider} />
			<div className={styles.items}>
				{(showAll ? positions : positions.slice(0, 3)).map(
					(item: any) => {
						const {
							selected = false,
							quantity,
							status = '',
							id,
							image = '',
							referenceObject
						} = item
						return (
							<ItemPlate
								className={styles.item}
								key={id}
								id={id}
								selected={selected}
								name={referenceObject?.configurationName ?? ''}
								status={status}
								image={image}
								quantity={quantity}
								price={+(referenceObject?.price ?? 0)}
								onSelect={(id, selected) =>
									basketStore.set.changePosition({ id, selected })
								}
								onChangeQuantity={(id, quantity) =>
									basketStore.set.changePosition({ id, quantity })
								}
								basketItem={item}
							/>
						)
					}
				)}
			</div>
			{positions.length > 3 && (
				<div className={styles.showAll}>
					<div className={styles.divider} />
					<Button
						className={styles.showAllButton}
						view='default'
						leftAddon={
							<Image
								className={clsx(styles.icon, showAll && styles.iconFolded)}
								src={rightArrowSrc}
								alt=''
							/>
						}
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Hide all items' : 'Show all items'}
						<div className={styles.counter}>
							<span>{positions.length - 3}</span>
						</div>
					</Button>
				</div>
			)}
		</div>
	)
}

export default SelectItems
