import { createStore } from 'zustand-x'
import { TUserInfo } from '@my-types/user'

export type TAuthStore = {
	authorized: boolean
	clientId: string
	token: string
	sessionId: string
	user: TUserInfo
}

export const authStore = createStore('auth')<TAuthStore>({
	// authorized: true,
	// clientId: '46438c59-63c6-47af-2cd3-08da1c725dd8',
	token: null,
	authorized: false,
	clientId: null,
	// token: null,
	sessionId: null,
	user: null
})

/**
 * скрыть templates на страницах orders, configurations
 * configurations - status - in process: 1, ordered: 2, deleted: 3
 * */
