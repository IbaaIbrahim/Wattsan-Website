import { useLayoutEffect, useState } from 'react'

const pool = {}

const getMatchMedia = query => {
	if (!pool[query]) {
		pool[query] = window.matchMedia(`(${query})`)
	}

	return pool[query]
}

const releaseMatchMedia = query => {
	if (pool[query]) {
		delete pool[query]
	}
}

export const useMatchMedia = (
	mediaQuery: string,
	defaultValue: boolean | null = false
): [boolean | null] => {
	const [matches, setMatches] = useState(defaultValue)

	useLayoutEffect(() => {
		const mql = getMatchMedia(mediaQuery)
		const handleMatchChange = () => {
			console.log(mql.matches)
			setMatches(mql.matches)
		}

		handleMatchChange()

		mql.addEventListener('change', handleMatchChange)

		return () => {
			mql.removeEventListener('change', handleMatchChange)

			releaseMatchMedia(mediaQuery)
		}
	}, [mediaQuery])

	return [matches]
}
