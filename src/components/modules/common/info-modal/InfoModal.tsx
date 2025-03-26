import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'

import styles from './InfoModal.module.scss'

const InfoModal = ({
	hint,
	title,
	description,
	accentButton,
	secondaryButton
}: {
	hint?: string
	title?: string
	description?: string
	accentButton: {
		text: string
		onClick: () => void
	}
	secondaryButton: {
		text: string
		onClick: () => void
	}
}) => {
	return (
		<>
			{hint && (
				<Typography
					className={styles.hint}
					tag='p'
					size='m'
					discolored
				>
					{hint}
				</Typography>
			)}
			{title && <Typography tag='h2'>{title}</Typography>}
			{description && (
				<Typography
					className={styles.description}
					tag='p'
					size='m'
					weight='regular'
				>
					{description}
				</Typography>
			)}
			<div
				className={clsx(
					styles.actions,
					secondaryButton?.text && styles.doubleButtons
				)}
			>
				<Button
					block={true}
					size='l'
					view='black'
					onClick={accentButton.onClick}
				>
					{accentButton.text}
				</Button>
				{secondaryButton?.text && (
					<Button
						block={true}
						size='l'
						view='bordered'
						onClick={secondaryButton.onClick}
					>
						{secondaryButton.text}
					</Button>
				)}
			</div>
		</>
	)
}

export default InfoModal
