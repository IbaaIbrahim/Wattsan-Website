import { AuthModalContext } from '@components/modules/auth/context'
import { Form } from '@components/ui/inputs/form/Form'
import { Typography } from '@components/ui/typography/Typography'
import { signUpHandler } from '@store/auth/actions'
import { signUpForm } from '@store/forms'
import { requestsStore } from '@store/requests'
import { useContext } from 'react'

import Button from '../../../ui/button/Button'
import Input from '../../../ui/input/Input'
import FormCheckbox from '../../../ui/inputs/form-checkbox/FormCheckbox'
// import { FormPhone } from '../../../ui/inputs/form-phone/FormPhone'
import FormRadio from '../../../ui/inputs/form-radio/FormRadio'

import styles from './SignUp.module.scss'

const SignUp = () => {
	const authModalContext = useContext(AuthModalContext)

	const loading = requestsStore.use.loadingSelector('register')

	const values = signUpForm.use.valuesSelector()
	const errors = signUpForm.use.errorsSelector()

	const handleSubmit = () => {
		signUpHandler(() => {
			authModalContext.onChangeScreen('CONFIRMATION')
		}, authModalContext.onError)
	}

	const disabled =
		['fullName', 'phone', 'email'].some(name => {
			return values?.[name] === '' || !!errors?.[name]
		}) || values?.agreePolicy === false

	return (
		<Form onSubmit={handleSubmit}>
			<div className={styles.header}>
				<Typography tag='h1'>Sign Up</Typography>
				{!authModalContext.onlyInitialScreen && (
					<button
						className={styles.changeScreen}
						onClick={() => authModalContext.onChangeScreen('LOGIN')}
					>
						or Login
					</button>
				)}
			</div>
			<Typography
				className={styles.description}
				tag='p'
				size='m'
				weight='regular'
			>
				Registration of your account is done using one-time codes for secure
				access.
			</Typography>
			<Input
				className={styles.field}
				label='Full Name'
				placeholder='Enter your Full Name'
				disabled={loading}
				value={values?.fullName}
				error={errors?.fullName}
				onChange={value => signUpForm.set.change('fullName', value)}
				onBlur={() => signUpForm.set.blur('fullName')}
			/>
			<Input
				className={styles.field}
				label='Phone'
				placeholder='Enter your phone number'
				disabled={loading}
				value={values?.phone}
				error={errors?.phone}
				onChange={value => signUpForm.set.change('phone', value)}
				onBlur={() => signUpForm.set.blur('phone')}
			/>
			{/*<FormPhone*/}
			{/*	className={styles.field}*/}
			{/*	name='phone'*/}
			{/*	label='Phone'*/}
			{/*	placeholder='Enter your phone number'*/}
			{/*/>*/}
			<Input
				className={styles.field}
				label='E-mail'
				placeholder='Enter your e-mail address'
				disabled={loading}
				value={values?.email}
				error={errors?.email}
				onChange={value => signUpForm.set.change('email', value)}
				onBlur={() => signUpForm.set.blur('email')}
			/>
			<FormRadio
				name='activationType'
				label='Account verification'
				disabled={loading}
				value={values?.activationType as number}
				options={[
					{ value: 1, text: 'Via e-mail' },
					{ value: 2, text: 'Via phone' }
				]}
				onChange={value => signUpForm.set.change('activationType', value)}
			/>
			<Button
				className={styles.signUpButton}
				size='l'
				view='blue'
				disabled={disabled || loading}
			>
				Sign up
			</Button>
			<FormCheckbox
				className={styles.checkbox}
				disabled={loading}
				selected={values?.subscriptions}
				error={errors?.subscriptions}
				label='Subscribe to receive news and exclusive offers'
				onChange={value => signUpForm.set.change('subscriptions', value)}
			/>
			<FormCheckbox
				disabled={loading}
				selected={values?.agreePolicy}
				error={errors?.agreePolicy}
				label='Agree to privacy policy and personal data processing'
				onChange={value => signUpForm.set.change('agreePolicy', value)}
			/>
		</Form>
	)
}

export default SignUp
