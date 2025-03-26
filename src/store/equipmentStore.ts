import { create } from 'zustand'

import { EquipmentsStore } from '../types/equipment'

export const equipmentsStore = create<EquipmentsStore>(set => ({
	equipments: [],
	equipmentFilter: ['0'],
	changeEquipmentFilter: id =>
		set(() => ({
			equipmentFilter: [id]
		}))
}))
