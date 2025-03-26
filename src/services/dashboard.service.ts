import dashboardMock from './mocks/dashboard/dashboard.json'

class DashboardService {
	private BASE_URL = ''

	async getDashboard() {
		const response = await Promise.resolve(dashboardMock)

		return response
	}
}

export const dashboardService = new DashboardService()
