import { FC } from 'react'

import styles from './ChangePhoneSuccessModal.module.scss'

const ChangePhoneSuccessModal: FC = () => {
	return (
		<div className={styles.modal}>
			<div className={styles.title}>Phone number successfully changed</div>
			<div className={styles.description}>
				You can now use the new number for future communication and
				verification.
			</div>
		</div>
	)
}

export default ChangePhoneSuccessModal
