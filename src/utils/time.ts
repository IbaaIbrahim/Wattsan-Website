import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const getOrderDate = (date: string) => {
	if (!date) return ''

	return format(parseISO(date), 'd.MM.yyyy', { locale: enUS })
}
