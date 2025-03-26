import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import {
	ChangeEvent,
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEventHandler,
	RefObject,
	createRef,
	forwardRef,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import styles from './FormCode.module.scss'

type InputProps = {
	index: number
	value: string
	error: boolean
	disabled: boolean
	onFocus: FocusEventHandler<HTMLInputElement>
	onChange: (
		event: ChangeEvent<HTMLInputElement>,
		payload: { index: number }
	) => void
	onKeyDown: (
		event: KeyboardEvent<HTMLInputElement>,
		payload: { index: number }
	) => void
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
	({ index, value, error, disabled, onFocus, onChange, onKeyDown }, ref) => {
		const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
			onChange(event, { index })
		}

		const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
			onKeyDown(event, { index })
		}

		const handleClick: MouseEventHandler = event => {
			event.persist()
			const target = event.target as HTMLInputElement

			/**
			 * В сафари выделение корректно работает только с асинхронным вызовом
			 */
			requestAnimationFrame(() => {
				target?.select()
			})
		}

		return (
			<input
				ref={ref}
				className={clsx(styles.input, error && styles.inputError)}
				disabled={disabled}
				value={value}
				autoComplete={index === 0 ? 'one-time-code' : ''}
				inputMode='numeric'
				pattern='[0-9]*'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onFocus={onFocus}
				onClick={handleClick}
			/>
		)
	}
)

const FormCode: FC<{
	className?: string
	code: string
	fields: number
	error: string
	disabled: boolean
	onChange?: (code: string) => void
	onComplete?: (code: string) => void
}> = ({
	className,
	code,
	error,
	disabled,
	fields = 6,
	onChange,
	onComplete
}) => {
	const inputRefs = useMemo(
		() =>
			Array(fields)
				.fill({})
				.map(() => createRef<HTMLInputElement>()),
		[fields]
	)

	const [values, setValues] = useState(code.split(''))

	const clearErrorTimerId = useRef<ReturnType<typeof setTimeout>>()

	const focusOnInput = (inputRef: RefObject<HTMLInputElement>) => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const triggerChange = (argumentValues: string[]) => {
		const newValue = (argumentValues || values).join('')

		if (onChange) {
			onChange(newValue)
		}

		if (onComplete && newValue.length >= fields) {
			onComplete(newValue)
		}
	}

	const handleChange = (value: string, index: number) => {
		const newValue = value.replace(/\D/g, '')

		if (newValue === '') {
			return
		}

		let nextRef

		const newValues = [...values]

		if (newValue.length > 1) {
			let nextIndex = newValue.length + index - 1

			if (nextIndex >= fields) {
				nextIndex = fields - 1
			}

			nextRef = inputRefs[nextIndex]

			newValue.split('').forEach((item, i) => {
				const cursor = index + i

				if (cursor < fields) {
					newValues[cursor] = item
				}
			})
		} else {
			nextRef = inputRefs[index + 1]

			newValues[index] = newValue
		}

		setValues(newValues)

		if (nextRef && nextRef.current) {
			nextRef.current.focus()

			nextRef.current.select()
		}

		triggerChange(newValues)
	}

	const handleChangeFromEvent: InputProps['onChange'] = (event, { index }) => {
		const {
			target: { value }
		} = event

		handleChange(value, index)
	}

	const handleKeyDown: InputProps['onKeyDown'] = (event, { index }) => {
		const prevIndex = index - 1
		const nextIndex = index + 1

		const prevRef = inputRefs[prevIndex]
		const nextRef = inputRefs[nextIndex]
		const curtRef = inputRefs[index]

		const newValues = [...values]

		switch (event.key) {
			case 'Backspace':
				event.preventDefault()

				newValues[index] = ''

				if (prevRef) {
					focusOnInput(prevRef)
				}
				// if (index === fields - 1) {
				// 	newValues[index] = ''
				//
				// 	focusOnInput(prevRef)
				// } else if (values[index]) {
				// 	newValues[index] = ''
				// } else if (prevRef) {
				// 	newValues[prevIndex] = ''
				//
				// 	focusOnInput(prevRef)
				// }

				setValues(newValues)

				triggerChange(newValues)

				break
			case 'Delete':
				event.preventDefault()

				newValues[index] = ''

				if (!values[nextIndex]) {
					focusOnInput(curtRef)
				}

				if (nextRef) {
					focusOnInput(nextRef)
				}

				setValues(newValues)

				triggerChange(newValues)

				break
			case 'ArrowLeft':
				event.preventDefault()

				if (prevRef) {
					focusOnInput(prevRef)
				}

				break
			case 'ArrowRight':
				event.preventDefault()

				if (nextRef) {
					focusOnInput(nextRef)
				}

				break
			case 'ArrowUp':
			case 'ArrowDown':
				event.preventDefault()
				break
			default:
				break
		}
	}

	const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
		event.persist()
		const target = event.target as HTMLInputElement

		/**
		 * В сафари выделение корректно работает только с асинхронным вызовом
		 */
		requestAnimationFrame(() => {
			target?.select()
		})
	}

	useEffect(
		() => () => {
			if (clearErrorTimerId.current) {
				clearTimeout(clearErrorTimerId.current)
				clearErrorTimerId.current = undefined
			}
		},
		[error]
	)

	useEffect(() => {
		if (code.length === 0) {
			setValues([])
		}
	}, [code])

	return (
		<div className={clsx(styles.formCode, className)}>
			<div className={clsx(Boolean(error) && styles.shake, styles.fields)}>
				{new Array(fields).fill('').map((_, index) => (
					<Input
						ref={inputRefs[index]}
						key={`${index.toString()}field`}
						index={index}
						value={values[index]}
						disabled={disabled}
						error={!!error}
						onChange={handleChangeFromEvent}
						onFocus={handleFocus}
						onKeyDown={handleKeyDown}
					/>
				))}
			</div>

			{error && (
				<Typography
					className={styles.error}
					tag='p'
					size='m'
					weight='regular'
				>
					{error}
				</Typography>
			)}
		</div>
	)
}

export default FormCode
