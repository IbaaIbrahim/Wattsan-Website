'use client'

import DashboardView from '@components/modules/account/dashboard-view/DashboardView'
import { dashboardService } from '@services/dashboard.service'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
	const [dashboard, setDashboard] = useState(null)

	useEffect(() => {
		dashboardService.getDashboard().then(data => setDashboard(data))
	}, [])

	if (dashboard === null) return null

	return (
		<>
			<DashboardView dashboard={dashboard} />
		</>
	)
}

export default DashboardPage
