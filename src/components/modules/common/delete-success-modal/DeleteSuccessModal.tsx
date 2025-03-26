import { FC } from 'react'

import styles from './DeleteSuccessModal.module.scss'

const DeleteSuccessModal: FC = () => {
	return (
		<div className={styles.modal}>
			<div className={styles.title}>
				Your account has been successfully deleted
			</div>
		</div>
	)
}

export default DeleteSuccessModal
