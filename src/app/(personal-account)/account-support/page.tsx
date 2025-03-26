import SupportView from '@components/modules/account/support-view/SupportView'
import { supportService } from '@services/support.service'

export default async function Support() {
	const requests = await supportService.getRequests()

	return (
		<>
			<SupportView requests={requests} />
		</>
	)
}
