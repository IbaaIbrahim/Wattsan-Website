import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { modalsStore } from '@store/modals'
import { FC } from 'react'

import styles from './RegisterSuccessModal.module.scss'

const RegisterSuccessModal: FC = () => {
	return (
		<>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Your account has been successfully registered
			</Typography>
			<Typography
				tag='p'
				size='m'
				weight='regular'
			>
				Now you can log into your account, explore its features, and customize
				your profile.
			</Typography>
			<div className={styles.actions}>
				<Button
					view='green'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Save
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}

export default RegisterSuccessModal
