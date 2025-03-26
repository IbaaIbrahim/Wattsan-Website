import Button from '@components/ui/button/Button'
import FormTextarea from '@components/ui/form-textarea/FormTextarea'
import checkEmptyIcon from '@public/img/icons/check-empty.svg'
import checkIcon from '@public/img/icons/check.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './ReturnOrderModal.module.scss'

const ReturnOrderModal: FC<{
	items: { imgSrc: string; name: string; code: string; price: string }[]
	onSubmit: () => void
	onClose: () => void
}> = ({ items, onSubmit, onClose }) => {
	const [reason, setReason] = useState<string>('')
	const [selected, setSelected] = useState<number[]>([])

	const handleCheck = selectedId => {
		setSelected(
			selected.includes(selectedId)
				? selected.filter(id => id !== selectedId)
				: selected.concat([selectedId])
		)
	}

	const handleSubmit = () => {
		// TODO Add validation
		onSubmit()
	}

	return (
		<div>
			<div className={styles.title}>Return order</div>
			<div className={styles.description}>
				Select the items for return, state the reason, and our team will reach
				out to discuss your request in detail.
			</div>
			<div className={styles.itemsTitle}>
				Select the items you want to return
			</div>
			<div className={styles.items}>
				{items.map(({ imgSrc, name, code, price }, index) => (
					<label
						key={name}
						className={clsx(
							styles.checkboxWrapper,
							selected.includes(index) && styles.checkboxWrapperSelected
						)}
					>
						<input
							className={styles.hiddenCheckbox}
							type='checkbox'
							checked={selected.includes(index)}
							onChange={() => handleCheck(index)}
						/>
						<div className={clsx(styles.checkbox)}>
							<Image
								className={styles.icon}
								src={selected.includes(index) ? checkIcon : checkEmptyIcon}
								alt=''
							/>
						</div>
						<div className={styles.item}>
							<Image
								src={imgSrc}
								alt=''
								width={100}
								height={100}
							/>
							<div>
								<div className={styles.itemTitle}>{name}</div>
								<div className={styles.itemCode}>{code}</div>
								<div className={styles.itemPrice}>{price}</div>
							</div>
						</div>
					</label>
				))}
			</div>
			<div className={styles.itemsTitle}>
				Describe the reason for the return
			</div>
			<FormTextarea
				name='reason'
				label='Message'
				placeholder='Write your message'
				value={reason}
				onChange={setReason}
			/>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					disabled={selected.length === 0}
					onClick={handleSubmit}
				>
					Submit request
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={onClose}
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default ReturnOrderModal
