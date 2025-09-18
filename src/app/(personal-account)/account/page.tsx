'use client'
import SettingsView from '@components/modules/account/settings-view/SettingsView'
import { authStore } from '@store/auth'

export default function Account() {
	const user = authStore.use.user()
	if (!user) return null
	return (
		<>
			<SettingsView />
		</>
	)
}
