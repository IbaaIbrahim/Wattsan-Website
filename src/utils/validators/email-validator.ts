const DEFAULT_MESSAGE = 'Email entered incorrectly. Example: mail@domain.com'

const MAX_LENGTH = 35
const MAX_LENGTH_MESSAGE = `Maximum number of characters: ${MAX_LENGTH}`

/**
 * Валидатор поля email
 * @param message - Текст сообщения об ошибке (дефолтное значение: 'максимальное кол-во символов: ${MAX_LENGTH}')
 * @returns Возвращает функцию для валидации
 */
export const emailValidator =
	(message = DEFAULT_MESSAGE) =>
	/**
	 * Функция валидации
	 * @param value - Значение поля
	 * @returns null или сообщение об ошибке
	 */
	value => {
		const rfc2822Pattern =
			/^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]))$/

		const isRFC2822Valid = rfc2822Pattern.test(value)

		if (value) {
			if (
				!isRFC2822Valid ||
				value.substring(value.indexOf('@') + 1, value.lastIndexOf('.')).length <
					2 || // количество символов после @
				value.substring(value.lastIndexOf('.') + 1).length < 2 // количество символов после . в конце поля
			) {
				return message
			}

			if (value.length > MAX_LENGTH) {
				return MAX_LENGTH_MESSAGE
			}
		}

		return null
	}
