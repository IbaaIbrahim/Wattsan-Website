import DashboardView from '@components/modules/account/dashboard-view/DashboardView'
import { IDashboard } from '@my-types/dashboard'
import { dashboardService } from '@services/dashboard.service'

const DashboardPage = async () => {
	const dashboard: IDashboard = await dashboardService.getDashboard()

	return (
		<>
			<DashboardView dashboard={dashboard} />
		</>
	)
}

export default DashboardPage
