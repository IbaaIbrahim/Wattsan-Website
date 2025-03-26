import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import FormRadio from '@components/ui/inputs/form-radio/FormRadio'
import promoInfoSvg from '@public/img/icons/promo-info.svg'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './DeleteAccountModal.module.scss'

const DeleteAccountModal: FC<{ onClose: () => void }> = ({ onClose }) => {
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [type, setType] = useState<any>('phone')

	const handleSubmit = () => {
		// TODO Добавить запрос с удалением
		onClose()
	}

	return (
		<div className={styles.modal}>
			<div className={styles.title}>Delete account</div>
			<div className={styles.description}>
				Account verification will be required to proceed with deletion, using
				the verification code.
			</div>
			<div className={styles.fields}>
				<FormRadio
					className={styles.radio}
					name='type'
					label='Account verification'
					value={type}
					options={[
						{ value: 'phone', text: 'Via phone' },
						{ value: 'email', text: 'Via e-mail' }
					]}
					onChange={value => setType(value)}
				/>
				{type === 'phone' ? (
					<Input
						name='phone'
						label='Phone'
						placeholder='Enter your phone number'
						value={phone}
						error=''
						onChange={setPhone}
					/>
				) : (
					<Input
						name='email'
						label='E-mail'
						placeholder='Enter your e-mail'
						value={email}
						error=''
						onChange={setEmail}
					/>
				)}
			</div>
			<div className={styles.infoPlate}>
				<Image
					src={promoInfoSvg}
					alt=''
				/>
				<div className={styles.infoContent}>
					Please note that all your data will be permanently erased.
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					disabled={false}
					onClick={handleSubmit}
				>
					Delete account
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

export default DeleteAccountModal
