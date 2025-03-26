import { IEquipment, IEquipmentInfo } from '@my-types/equipment'

import equipmentMock from './mocks/equipment/equipment.json'

class EquipmentService {
	private BASE_URL = ''

	async getEquipments(): Promise<IEquipment[]> {
		const response = await Promise.resolve(equipmentMock)

		// TODO Заглушка для демонстрации
		// return []
		return response.equipments
	}

	async getEquipmentInfo(id: string): Promise<IEquipmentInfo> {
		const response = await Promise.resolve(equipmentMock)

		return response.equipmentsInfo[id]
	}
}

export const equipmentService = new EquipmentService()
