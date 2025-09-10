import { useCallback, useEffect, useRef, useState } from 'react'

type UseCountdown = (
	countdownDuration: number,
	tick?: number
) => [number, () => void, () => void]

/**
 * Возвращает время, которое осталось до истечения таймера в ms
 */
export const useCountdown: UseCountdown = (countdownDuration, tick = 1000) => {
	const timerId = useRef(0)

	const start = useRef(0)

	const [timePassed, setTimePassed] = useState(0)

	const stopTimer = useCallback(() => {
		window.clearInterval(timerId.current)
	}, [])

	const updateProgress = useCallback(() => {
		const passed = Date.now() - start.current

		if (passed >= countdownDuration) {
			stopTimer()

			setTimePassed(countdownDuration)
		} else {
			setTimePassed(passed)
		}
	}, [countdownDuration, stopTimer])

	const startTimer = useCallback(() => {
		stopTimer()

		start.current = Date.now()

		updateProgress()

		timerId.current = window.setInterval(updateProgress, tick)
	}, [stopTimer, updateProgress, tick])

	const timeLeft = Math.ceil((countdownDuration - timePassed) / 1000)

	useEffect(
		() => () => {
			stopTimer()
		},
		[stopTimer]
	)

	return [timeLeft, startTimer, stopTimer]
}

export const usePrevious = <T,>(value: T): T | undefined => {
	const currentValue = useRef<T>()
	const previousValue = useRef<T>()

	if(currentValue.current !== value) {
		previousValue.current = currentValue.current
		currentValue.current = value
	}

	// useEffect(() => {
	// 	ref.current = value
	// }, [value])

	return previousValue.current
}

