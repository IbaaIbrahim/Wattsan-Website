import {
	API_LOGIN_BY_CODE_URL,
	API_LOGIN_URL,
	API_REGISTER_URL,
	API_VERIFY_URL
} from '@constants/api'
import { loginForm, signUpForm } from '@store/forms'
import { STATUSES, requestsStore } from '@store/requests'
import Cookie from 'js-cookie'
import qs from 'query-string'

import { request } from '../../utils/request'

import { authStore } from './index'
import { TUserInfo } from '@my-types/user'

export const loginHandler = async (onComplete, onError) => {
	const valid = loginForm.set.validate()

	if (!valid) return

	const { email, rememberMe } = loginForm.get.valuesSelector()

	requestsStore.set.updateRequest('login', STATUSES.loading)

	try {
		const response = await request({
			url: API_LOGIN_BY_CODE_URL,
			method: 'GET',
			query: {
				email,
				rememberMe
			}
		})

		// loginForm.set.reset()
		// authStore.set.clientId(response.data.content.id)
		// authStore.set.token(response.data.content.token)
		// authStore.set.authorized(true)
		requestsStore.set.updateRequest('login', STATUSES.success)

		onComplete()
	} catch (error) {
		requestsStore.set.updateRequest('login', STATUSES.success)

		onError()
	}
}

export const reLoginHandler = async (code, onComplete, onError) => {
	try {
		const values = signUpForm.get.valuesSelector()
		const loginValues = loginForm.get.valuesSelector()

		const response = await request({
			url: API_LOGIN_URL,
			method: 'POST',
			data: {
				email: values?.email || loginValues?.email,
				password: code,
				rememberMe: false
			}
		})

		const responseData: TUserInfo = response?.content

		authStore.set.clientId(responseData.id)
		authStore.set.token(responseData.token)
		authStore.set.authorized(true)
		authStore.set.user(responseData)
		signUpForm.set.reset()

		Cookie.set(
			'wattsan_data',
			JSON.stringify({
				clientId: responseData?.id,
				token: responseData?.token,
				user: responseData
			})
		)

		onComplete()
	} catch (error) {
		console.error('store/auth/actions.js -> reLoginHandler', error)

		onError()
	}
}

export const signUpHandler = async (onComplete, onError) => {
	const valid = signUpForm.set.validate()

	if (!valid) return

	const { fullName, email, phone, subscriptions, activationType } =
		signUpForm.get.valuesSelector()

	requestsStore.set.updateRequest('register', STATUSES.loading)

	try {
		const response = await request({
			url: API_REGISTER_URL,
			method: 'POST',
			data: {
				email,
				phone,
				fullName,
				subscriptions,
				activationType
			}
		})

		authStore.set.sessionId(response?.data?.content?.id)

		onComplete()

		requestsStore.set.updateRequest('register', STATUSES.success)
	} catch (error) {
		requestsStore.set.updateRequest('register', STATUSES.failure)
	}
}

export const verifyHandler = async (code, onComplete, onError) => {
	requestsStore.set.updateRequest('verify', STATUSES.loading)

	try {
		const sessionId = authStore.get.sessionId()

		const response = await request({
			url: API_VERIFY_URL,
			method: 'POST',
			data: {
				id: sessionId,
				verification_code: +code
			}
		})

		const error = response?.data?.error_code ?? null

		if (error !== 0) {
			onError()

			requestsStore.set.updateRequest('verify', STATUSES.failure)
		} else {
			onComplete()

			requestsStore.set.updateRequest('verify', STATUSES.success)
		}
	} catch (error) {
		requestsStore.set.updateRequest('verify', STATUSES.failure)

		onError()
	}
}

export const checkAuthorize = async () => {
	try {
		const { token = null, clientId = null, user = {} } = Object(
			JSON.parse(Cookie.get('wattsan_data') ?? '')
		)

		if (token) {
			authStore.set.token(token)
			authStore.set.clientId(clientId)
			authStore.set.authorized(true)
			authStore.set.user(user)
		}
	} catch (error) {
		console.error(error)
	}
}

export const logOut = async () => {
	try {
		Cookie.remove('wattsan_data')
		authStore.set.token(null)
		authStore.set.clientId(null)
		authStore.set.authorized(null)
		authStore.set.user(null)
		window.location.reload()
	} catch (error) {
		console.error(error)
	}
}
