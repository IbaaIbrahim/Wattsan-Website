import { create } from 'zustand'

import { TComparisonStore } from '../types/comparison'

export const selectEquipmentByType =
	(type: string) => (state: TComparisonStore) => ({
		equipments: state.equipmentByType[type],
		changeEquipments: state.changeEquipmentByType
	})

export const comparisonStore = create<TComparisonStore>(set => ({
	equipmentType: '01',
	changeEquipmentType: id => set(() => ({ equipmentType: id })),
	equipmentByType: {
		'01': [null, null, null, null],
		'02': [null, null, null, null],
		'03': [null, null, null, null],
		'04': [null, null, null, null],
		'05': [null, null, null, null],
		'06': [null, null, null, null],
		'07': [null, null, null, null],
		'08': [null, null, null, null]
	},
	changeEquipmentByType: (id, index, type) =>
		set(state => {
			const equipments = [...state.equipmentByType[type]]

			equipments.splice(index, 1, equipments[index] === id ? null : id)

			return {
				equipmentByType: {
					...state.equipmentByType,
					[type]: equipments
				}
			}
		}),
	clearEquipmentByType: type =>
		set(state => {
			return {
				equipmentByType: {
					...state.equipmentByType,
					[type]: [null, null, null, null]
				}
			}
		})
}))
