export interface IEquipment {
	type: string
	name: string
	code: string
	status: string
	image: string
	serialNumber: string
	id: string
}

export interface IEquipmentInfo {
	image: string
	id: string
	type: string
	name: string
	code: string
	status: string
	serialNumber: string
	productionDate: string
	specificationPdf: string
	repairEndDate: string
	currentStatus: string
	historyDescription: string
	history: {
		type: string
		date: string
		issue: string
		performedTasks: string
	}[]
}

export interface EquipmentsStore {
	equipments: IEquipment[]
	equipmentFilter: string[]
	changeEquipmentFilter: (id: string) => void
}
