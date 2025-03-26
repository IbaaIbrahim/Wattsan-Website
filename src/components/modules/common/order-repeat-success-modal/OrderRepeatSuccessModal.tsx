import Button from '@components/ui/button/Button'
import { FC } from 'react'

import styles from './OrderRepeatSuccessModal.module.scss'

const OrderRepeatSuccessModal: FC = () => {
	return (
		<div>
			<div className={styles.title}>Items successfully added to basket</div>
			<div className={styles.description}>Proceed to basket to checkout.</div>
			<div className={styles.actions}>
				<Button
					block={true}
					size='l'
					view='black'
				>
					Go to basket
				</Button>
				<Button
					block={true}
					size='l'
					view='bordered'
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default OrderRepeatSuccessModal
