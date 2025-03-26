import { FC } from 'react'

import styles from './ReturnOrderSuccessModal.module.scss'

const ReturnOrderSuccessModal: FC = () => {
	return (
		<div className={styles.modal}>
			<div className={styles.title}>Return request successfully submitted</div>
			<div className={styles.description}>
				Expect our teams to contact you soon via the email provided in your
				account to discuss return details. You can track the status of your
				return on the order page in your account.
			</div>
		</div>
	)
}

export default ReturnOrderSuccessModal
