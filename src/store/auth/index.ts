import { createStore } from 'zustand-x'

export type TAuthStore = {
	authorized: boolean
	clientId: string
	token: string
	sessionId: string
}

export const authStore = createStore('auth')<TAuthStore>({
	// authorized: true,
	// clientId: '46438c59-63c6-47af-2cd3-08da1c725dd8',
	token: '1734076503',
	authorized: false,
	clientId: null,
	// token: null,
	sessionId: null
})
