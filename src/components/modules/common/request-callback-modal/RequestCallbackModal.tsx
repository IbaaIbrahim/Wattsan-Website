import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import { FC, useState } from 'react'

import styles from './RequestCallbackModal.module.scss'

const RequestCallbackModal: FC<{
	onSubmit: () => void
	onClose: () => void
}> = ({ onSubmit, onClose }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	return (
		<>
			<div className={styles.title}>Request a callback</div>
			<div className={styles.description}>
				Have questions or need immediate help? Request a callback for prompt
				assistance.
			</div>
			<div className={styles.subtitle}>Your contact information</div>
			<Input
				className={styles.field}
				name='name'
				label='Full name'
				placeholder='Mark Markov'
				value={name}
				onChange={setName}
			/>
			<Input
				className={styles.field}
				name='phone'
				label='Phone'
				placeholder=''
				value={phone}
				onChange={setPhone}
			/>
			<div className={styles.actions}>
				<Button
					size='l'
					view='black'
					onClick={onSubmit}
				>
					Request a callback
				</Button>
				<Button
					size='l'
					view='bordered'
					onClick={onClose}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}

export default RequestCallbackModal
