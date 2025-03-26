'use client'

import ItemPlate from '@components/modules/basket/item-plate/ItemPlate'
import Button from '@components/ui/button/Button'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import rightArrowSrc from '@public/img/icons/right-arrow.svg'
import { basketStore } from '@store/basketStore'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import styles from './SelectItems.module.scss'

const SelectItems = () => {
	const [showAll, setShowAll] = useState<boolean>(false)

	const { items, changeQuantity, changeSelected, changeAllSelect } =
		basketStore(
			({ items, changeQuantity, changeSelected, changeAllSelect }) => ({
				items,
				changeSelected,
				changeQuantity,
				changeAllSelect
			})
		)

	return (
		<div className={styles.wrapper}>
			<FormCheckbox
				className={styles.allItems}
				name='allItems'
				label='Select all items for checkout'
				selected={items.every(({ selected }) => selected)}
				onChange={changeAllSelect}
			/>
			<div className={styles.divider} />
			<div className={styles.items}>
				{(showAll ? items : items.slice(0, 3)).map(
					({
						selected,
						name,
						quantity,
						code,
						price,
						limit,
						status,
						id,
						image
					}) => (
						<ItemPlate
							className={styles.item}
							key={id}
							id={id}
							selected={selected}
							name={name}
							code={code}
							status={status}
							image={image}
							quantity={quantity}
							limit={limit}
							price={price}
							onSelect={changeSelected}
							onChangeQuantity={changeQuantity}
						/>
					)
				)}
			</div>
			{items.length > 3 && (
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
							<span>{items.length - 3}</span>
						</div>
					</Button>
				</div>
			)}
		</div>
	)
}

export default SelectItems
