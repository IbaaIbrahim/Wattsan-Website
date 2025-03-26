import { useEffect, useState } from 'react'

import PhoneCodes from '../phone-codes/PhoneCodes'

import styles from './FormInput.module.scss'

interface Props {
	label: string
	name: string
	type: 'number' | 'text' | 'phone' | 'name'
	placeholder: string
	value?: string
	change: (changeObj: { name: string; value: string }) => void
	validationStateChange?: (fieldNamne: string, isValid: boolean) => void
}

const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
const nameRegex = /^[a-zA-Z][a-zA-Z '-]*[a-zA-Z]$/i

const FormInput = (props: Props) => {
	const [inputValue, setInputValue] = useState<string>(props.value || '')
	const [phoneCode, setPhoneCode] = useState<string>('')

	let codeSelect = (code: string) => {
		setPhoneCode(code)
	}

	const validateInput = () => {
		let validationSuccess: boolean = true

		switch (props.type) {
			case 'phone': {
				validationSuccess = phoneRegex.test(inputValue)
				break
			}
		}

		switch (props.type) {
			case 'name': {
				validationSuccess = nameRegex.test(inputValue)
				break
			}
		}

		props.validationStateChange &&
			props.validationStateChange(props.name, validationSuccess)
	}

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		let value = (event.target as HTMLInputElement).value

		setInputValue(value)
	}

	useEffect(() => {
		validateInput()
		switch (props.type) {
			case 'phone': {
				props.change({ name: props.name, value: phoneCode + inputValue })
				break
			}
			default: {
				props.change({ name: props.name, value: inputValue })
			}
		}
	}, [inputValue, phoneCode])

	return (
		<div className={styles.wrapper}>
			<label className={styles['wrapper__label']}>{props.label}</label>
			<div className='input'></div>
			<input
				className={`${styles['wrapper__input']} ${props.type === 'phone' ? styles['wrapper__input--phone'] : ''}`}
				name={props.name}
				type={props.type}
				placeholder={props.placeholder}
				value={inputValue}
				onChange={handleInputChange}
			/>
			{props.type === 'phone' ? (
				<div className={styles['phone-codes']}>
					<PhoneCodes selectCode={codeSelect} />
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default FormInput
