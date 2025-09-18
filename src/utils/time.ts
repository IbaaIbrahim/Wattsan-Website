import { format, parse, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const getOrderDate = (date: string) => {
	if (!date) return ''

	return format(parseISO(date), 'd.MM.yyyy', { locale: enUS })
}
// export const getOrderDate = (date: string) => {
//   if (!date) return ''
//   const parsed = parse(date, 'dd.MM.yyyy', new Date())
//   return format(parsed, 'd.MM.yyyy', { locale: enUS })
// }