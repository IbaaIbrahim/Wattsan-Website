import ConfirmationCode from '@components/modules/auth/confirmation-code/ConfirmationCode';
import { AuthModalContext } from '@components/modules/auth/context';
import Login from '@components/modules/auth/login/Login';
import SignUp from '@components/modules/auth/sign-up/SignUp';
import { useCountdown, usePrevious } from '@components/modules/auth/utils'
import {
	loginHandler,
	reLoginHandler,
	signUpHandler,
	verifyHandler
} from '@store/auth/actions'
import { FC, useEffect, useState } from 'react';
import { authStore } from '@store/auth'


const screensMap = {
	SIGN_UP: SignUp,
	LOGIN: Login,
	CONFIRMATION: ConfirmationCode
}

const AuthModal: FC<{
	onlyInitialScreen?: boolean
	initialScreen?: keyof typeof screensMap
	onComplete: (params: { type: 'register' | 'authorize' }) => void
	onError: () => void
}> = ({
		  onlyInitialScreen = false,
		  initialScreen = 'LOGIN',
		  onComplete,
		  onError
	  }) => {
	const [screen, setScreen] = useState<keyof typeof screensMap>(initialScreen)
	const [state, setState] = useState<'INITIAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS'>('INITIAL')
	const [code, setCode] = useState('')

	const [timeLeft, startTimer, stopTimer] = useCountdown(60 * 1000)

	const prevScreen = usePrevious(screen)
	// const prevState = usePrevious(state)

	useEffect(() => {
		startTimer()
	}, [startTimer])

	useEffect(() => {
		/**
		 * Перезапускаем таймер после повторного запроса кода
		 */
		if (state === 'INITIAL') {
			startTimer()
		}
	}, [state, startTimer])

	const tempEmail = authStore.use.tempEmail()

	const handleSmsRetry = async () => {
		setCode('')
		setState('PROCESSING')
		// if (type === 'authorize') {
			loginHandler(
				() => {
					setState('INITIAL')
					// setCode('')
					startTimer()
				},
				onError,
				tempEmail
			)
		// } else {
		// 	await signUpHandler(
		// 		() => {
		// 			setState('INITIAL')
		// 			// setCode('')
		// 			startTimer()
		// 		},
		// 		() => {
		// 			setState('ERROR')
		// 		}
		// 	)
		// }
	}

	const handleInputFinished = async (code: string) => {
		setState('PROCESSING')
		setCode(code)

		const type = prevScreen === 'LOGIN' ? 'authorize' : 'register'

		if (type === 'authorize') {
			await reLoginHandler(
				code,
				() => {
					setState('SUCCESS')
					setCode('')
					onComplete({type})
				},
				() => {
					setState('ERROR')
				}
			)
		} else {
			await verifyHandler(
				code,
				async () => {
					await reLoginHandler(
						code,
						() => {
							setState('SUCCESS')
							setCode('')
							onComplete({type})
						},
						() => {
							setState('ERROR')
						}
					)
				},
				() => {
					setState('ERROR')
				}
			)
		}
	}

	const contextValue: any = {
		onlyInitialScreen,
		screen,
		state,
		prevScreen,
		countdownDuration: 60 * 1000,
		timeLeft,
		code,
		onInputFinished: handleInputFinished,
		onSmsRetryClick: handleSmsRetry,
		onChangeState: setState,
		onChangeScreen: setScreen,
		onComplete,
		onError
	}

	const CurrentScreen = screensMap[screen]

	return (
		<AuthModalContext.Provider value={contextValue}>
			<CurrentScreen/>
		</AuthModalContext.Provider>
	)
}

export default AuthModal
