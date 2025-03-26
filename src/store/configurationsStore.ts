import { create } from 'zustand'

import { IConfigurationsStore } from '../types/configurations'

export const configurationsStore = create<IConfigurationsStore>(set => ({
	configurations: [],
	configurationsFilter: ['0'],
	changeFilter: id =>
		set(state => ({
			configurationsFilter: state.configurationsFilter.includes(id)
				? ['0']
				: [id]
		})),
	templates: [],
	templatesFilter: ['0'],
	changeTemplatesFilter: id =>
		set(state => {
			const newFilters = [...state.templatesFilter]

			if (id === '0') {
				return { templatesFilter: ['0'] }
			}

			if (!newFilters.includes(id)) {
				newFilters.push(id)

				if (newFilters.includes('0')) {
					newFilters.splice(newFilters.indexOf('0'), 1)
				}
			} else {
				newFilters.splice(newFilters.indexOf(id), 1)
			}

			if (newFilters.length === 0) {
				newFilters.push('0')
			}

			return { templatesFilter: newFilters }
		}),
	popularTemplates: []
}))
