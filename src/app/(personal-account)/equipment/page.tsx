import EquipmentView from '@components/modules/account/equipment-view/EquipmentView'
import { equipmentService } from '@services/equipment.service'

const EquipmentPage = async () => {
	const equipments = await equipmentService.getEquipments()

	return (
		<>
			<EquipmentView equipments={equipments} />
		</>
	)
}

export default EquipmentPage
