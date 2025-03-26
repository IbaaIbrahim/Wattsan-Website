import EquipmentInfoPage from '@components/modules/account/equipment-info-page/EquipmentInfoPage'
import { equipmentService } from '@services/equipment.service'
import { notFound } from 'next/navigation'

const Equipment = async ({ params }: { params: { equipmentId: string } }) => {
	if (!params.equipmentId) {
		notFound()
	}

	const equipmentInfo = await equipmentService.getEquipmentInfo(
		params.equipmentId
	)

	return (
		<>
			<EquipmentInfoPage info={equipmentInfo} />
		</>
	)
}

export default Equipment
