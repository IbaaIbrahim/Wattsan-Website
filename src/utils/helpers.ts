import {
	complement,
	equals,
	filter,
	head,
	isEmpty,
	isNil,
	keys,
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
