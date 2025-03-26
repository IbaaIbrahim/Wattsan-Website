import { createContext } from 'react'

const mockFn = () => undefined

export type TScreen = 'SIGN_UP' | 'LOGIN' | 'CONFIRMATION'
export type TState = 'INITIAL' | 'PROCESSING' | 'ERROR' | 'SUCCESS'

export const AuthModalContext = createContext<{
	onlyInitialScreen: boolean
	screen: TScreen
	prevScreen: TScreen
	state: TState
	countdownDuration: number
	timeLeft: number
	code: string
	onInputFinished: (code: string) => void | typeof mockFn
	onSmsRetryClick: () => void | typeof mockFn
	onChangeState: (state: TState) => void | typeof mockFn
	onChangeScreen: (screen: TScreen) => void | typeof mockFn
	onComplete: () => void
	onError: () => void
}>({
	onlyInitialScreen: false,
	screen: 'SIGN_UP',
	prevScreen: 'SIGN_UP',
	state: 'INITIAL',
	countdownDuration: 60 * 1000,
	timeLeft: 60 * 1000,
	code: '',
	onInputFinished: mockFn,
	onSmsRetryClick: mockFn,
	onChangeState: mockFn,
	onChangeScreen: mockFn,
	onComplete: mockFn,
	onError: mockFn
})
