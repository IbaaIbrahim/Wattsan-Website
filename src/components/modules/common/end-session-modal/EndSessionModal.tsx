import Button from '@components/ui/button/Button'
import { FC } from 'react'

import styles from './EndSessionModal.module.scss'

const EndSessionModal: FC<{ allSession: boolean }> = ({ allSession }) => {
	return (
		<div>
			<div className={styles.title}>
				{allSession ? 'End all sessions?' : 'End a session?'}
			</div>
			<div className={styles.description}>
				For future logins, you'll need to access your account using a
				verification code.
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='m'
					block={true}
				>
					Confirm
				</Button>
				<Button
					view='bordered'
					size='m'
					block={true}
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default EndSessionModal
