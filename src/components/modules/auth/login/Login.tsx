import { AuthModalContext } from '@components/modules/auth/context'
import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import { Form } from '@components/ui/inputs/form/Form'
import { Typography } from '@components/ui/typography/Typography'
import { loginHandler } from '@store/auth/actions'
import { loginForm } from '@store/forms'
import { requestsStore } from '@store/requests'
import { useContext } from 'react'

import styles from './Login.module.scss'

const Login = () => {
	const values = loginForm.use.valuesSelector()
	const errors = loginForm.use.errorsSelector()

	const loading = requestsStore.use.statusSelector('login')

	const authModalContext = useContext(AuthModalContext)

	const handleLogin = () => {
		loginHandler(() => {
			authModalContext.onChangeScreen('CONFIRMATION')
		}, authModalContext.onError)
	}

	return (
		<Form onSubmit={handleLogin}>
			<div className={styles.header}>
				<Typography tag='h1'>Login</Typography>
				{!authModalContext.onlyInitialScreen && (
					<button
						className={styles.changeScreen}
						onClick={() => authModalContext.onChangeScreen('SIGN_UP')}
					>
						or Sign up
					</button>
				)}
			</div>
			<Typography
				className={styles.description}
				tag='p'
				size='m'
				weight='regular'
			>
				We use one-time codes for secure entry into your personal account.
			</Typography>
			<Input
				name='email'
				label='E-mail'
				placeholder='Enter your e-mail address'
				disabled={loading === 'loading'}
				value={values?.email}
				error={errors?.email}
				onChange={value => loginForm.set.change('email', value)}
				onBlur={() => loginForm.set.blur('email')}
			/>
			<Button
				className={styles.loginButton}
				view='green'
				disabled={loading === 'loading'}
				size='l'
				type='submit'
			>
				Login
			</Button>
			<FormCheckbox
				name='rememberMe'
				label='Remember me'
				disabled={loading === 'loading'}
				selected={values?.rememberMe}
				error={errors?.rememberMe}
				onChange={value => loginForm.set.change('rememberMe', value)}
			/>
		</Form>
	)
}

export default Login
