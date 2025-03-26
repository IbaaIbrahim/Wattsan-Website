import { createStore } from 'zustand-x'

export type TModalsStore = {
	modal: { name: string; props: any }
	disabled: boolean
}

export const modalsStore = createStore('modals')<TModalsStore>({
	modal: {
		name: null,
		props: {}
	},
	disabled: false
}).extendActions((set, get) => ({
	open: (name, props: any & { closeOnEscape?: boolean } = {}) => {
		const closeOnEscape = true
		set.modal({ name, props: { closeOnEscape, ...props } })
	},
	close: () => {
		set.modal({ name: null, props: {} })
	}
}))
