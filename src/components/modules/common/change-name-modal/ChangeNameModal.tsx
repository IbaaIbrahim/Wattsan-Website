import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import { FC, useState } from 'react'

import styles from './ChangeNameModal.module.scss'

const ChangeNameModal: FC<{
	onChange: (value: string) => void
	onClose: () => void
}> = ({ onChange, onClose }) => {
	const [name, setName] = useState<string>('')

	const handleChange = (value: string) => {
		setName(value)
	}

	const handleSubmit = () => {
		// TODO Add validation
		onChange(name)
	}

	return (
		<div>
			<div className={styles.title}>Change name</div>
			<Input
				name='name'
				label='Full Name'
				placeholder='Mark Markov'
				value={name}
				error=''
				onChange={handleChange}
			/>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					disabled={name.length === 0}
					onClick={handleSubmit}
				>
					Save
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

export default ChangeNameModal
