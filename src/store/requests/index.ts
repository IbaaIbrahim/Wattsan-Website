import { createStore } from 'zustand-x'

export enum STATUSES {
	idle = 'idle',
	loading = 'loading',
	success = 'success',
	failure = 'failure'
}

export const requestsStore = createStore('requests')<{
	requests: { [key: string]: STATUSES }
}>({
	requests: {}
})
	.extendActions((set, get, api) => ({
		updateRequest: (request: string, status: STATUSES) =>
			set.requests({ ...get.requests(), [request]: status })
	}))
	.extendSelectors((set, get) => ({
		loadingSelector: (request: string) =>
			get.requests()?.[request] === STATUSES.loading ?? false,
		statusSelector: (request: string) =>
			get.requests()?.[request] ?? STATUSES.idle,
		multipleLoadingSelector: requests =>
			requests.some(request => get.requests()?.[request] === STATUSES.loading),
		multipleIdleSelector: requests =>
			requests.some(
				request =>
					(get.requests()?.[request] ?? STATUSES.idle) === STATUSES.idle
			)
	}))
