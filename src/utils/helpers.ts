import {
	complement,
	equals,
	filter,
	head,
	isEmpty,
	isNil,
	keys,
	pickAll,
	union
} from 'ramda'

/**
 * Функция проверки на null или undefined
 * @param value - Значение
 * @return true | false
 */
const isNotNil = complement(isNil)

/**
 * Функция проверки на пустое значение
 * @param value - Значение
 * @return true | false
 */
const isNotEmpty: <T>(value: T) => boolean = complement(isEmpty)

/**
 * Функция возвращающая первое notNil значение
 * @param values - Значения
 * @return первое notNil значение или undefined
 */
export const firstPass = values => {
	const results = filter(isNotNil)(values)

	if (isNotEmpty(results)) {
		return head(results)
	}

	return undefined
}

export const countKeysDiff = (obj1, obj2) => {
	const keys1 = keys(obj1)
	const keys2 = keys(obj2)
	const allKeys = union(keys1, keys2)

	const differences = allKeys.filter(key => !equals(obj1[key], obj2[key]))

	return differences.length
}

const setUrlParamSilently = (key: string, value: string) => {
	const url = new URL(window.location.href)
	url.searchParams.set(key, value)

	window.history.replaceState({}, '', url.toString())
}

export const formatMediaUrl = (url?: string | null): string => {
	if (!url || typeof url !== 'string') return ''
	const trimmed = url.trim()
	if (!trimmed) return ''
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		return trimmed
	}
	if (trimmed.startsWith('Attachments/') || trimmed.startsWith('/Attachments/')) {
		const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
		return `https://api.wattsancnc.com/${cleanPath}`
	}
	if (trimmed.startsWith('/')) {
		return trimmed
	}
	return `/${trimmed}`
}

export { pickAll, setUrlParamSilently }
