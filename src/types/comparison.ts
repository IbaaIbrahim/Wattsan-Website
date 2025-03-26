export type TComparisonStore = {
	equipmentType: string
	changeEquipmentType: (id: string) => void
	equipmentByType: {
		[key: string]: string[]
	}
	changeEquipmentByType: (id: string, index: number, type: string) => void
	clearEquipmentByType: (type: string) => void
}
