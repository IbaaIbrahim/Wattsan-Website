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

export const loginHandler = async (onComplete, onError) => {
	const valid = loginForm.set.validate()

	if (!valid) return

	const { email, rememberMe } = loginForm.get.valuesSelector()

	requestsStore.set.updateRequest('login', STATUSES.loading)

	try {
		const response = await request(
			qs.stringifyUrl({
				url: API_LOGIN_BY_CODE_URL,
				query: {
					email,
					rememberMe
				}
			}),
			'GET'
		)

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

		const response = await request(API_LOGIN_URL, 'POST', {
			email: values?.email || loginValues?.email,
			password: code,
			rememberMe: false
		})

		authStore.set.clientId(response.data.content.id)
		authStore.set.token(response.data.content.token)
		authStore.set.authorized(true)
		signUpForm.set.reset()

		Cookie.set(
			'wattsan_data',
			JSON.stringify({
				clientId: response.data.content.id,
				token: response?.data?.content?.token
			})
		)

		onComplete()
	} catch (error) {
		console.error(error)

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
		const response = await request(API_REGISTER_URL, 'POST', {
			email,
			phone,
			fullName,
			subscriptions,
			activationType
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

		const response = await request(API_VERIFY_URL, 'POST', {
			id: sessionId,
			verification_code: +code
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
		const { token = null, clientId = null } = Object(
			JSON.parse(Cookie.get('wattsan_data') ?? '')
		)

		if (token) {
			authStore.set.token(token)
			authStore.set.clientId(clientId)
			authStore.set.authorized(true)
		}
	} catch (error) {
		console.error(error)
	}
}
