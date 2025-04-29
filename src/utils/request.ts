import { authStore } from '@store/auth'
import { STATUSES, requestsStore } from '@store/requests'
import axios from 'axios'
import qs from 'query-string'

export const request = async ({
	url,
	method,
	data = undefined,
	query = undefined,
	track = true
}: {
	url: string
	method: 'POST' | 'GET' | 'PUT'
	data?: any
	query?: object
	track?: boolean | string
}) => {
	try {

		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.loading
			)

		const response = await axios({
			method,
			url: method === 'GET' ? qs.stringifyUrl({ url, query } as any) : url,
			data,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.success
			)

		return response?.data ?? null
	} catch (error) {
		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.failure
			)

		throw error
	}
}

export const authorizedRequest = async ({
	url,
	method,
	data = undefined,
	query = undefined,
	track = true
}: {
	url: string
	method: 'POST' | 'GET' | 'PUT'
	data?: any
	query?: object
	track?: boolean | string
}) => {
	try {
		const token = authStore.get.token()

		if (!token) {
			return new Error('Authorization token is missing')
		}

		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.loading
			)

		const response = await axios({
			method,
			url: method === 'GET' ? qs.stringifyUrl({ url, query } as any) : url,
			data,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		})

		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.success
			)

		return response?.data ?? null
	} catch (error) {
		if (track)
			requestsStore.set.updateRequest(
				typeof track === 'boolean' ? url : track,
				STATUSES.failure
			)

		throw error
	}
}
