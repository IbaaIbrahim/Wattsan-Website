import { AccessoryCodes } from '@constants/accessoryCodes'
import { create } from 'zustand'

import {
	AccessoriesStore,
	IAccessories,
	IAccessoryNode
} from '../types/accessories'

export const accessoriesStore = create<AccessoriesStore>((set, get) => ({
	configurationName: '',
	allAccessories: {} as IAccessories,
	defaultCharacteristics: [],
	selectedCharacteristics: [],
	selectedAccessoryCodes: [],
	preselectedCharacteristics: [],
	setConfigurationName: (newName: string) =>
		set(state => ({ configurationName: newName })),
	selectCharacteristic: (
		currentCode: AccessoryCodes,
		current: IAccessoryNode
	) =>
		set(state => {
			let currUpdatedSelectionsByCode: IAccessoryNode[] =
				state.selectedCharacteristics.filter(
					item => item.staticCharacteristic.code !== currentCode
				)

			const isDefault = state.defaultCharacteristics.find(def =>
				compareCharacteristic(def, current)
			)

			if (!isDefault) {
				currUpdatedSelectionsByCode.push(current)
			}

			return {
				selectedCharacteristics: currUpdatedSelectionsByCode
			}
		}),
	allSelectionsToPreselect: () =>
		set(state => ({
			preselectedCharacteristics: state.selectedCharacteristics
		})),
	preselectCharacteristics: (nodes: IAccessoryNode[]) =>
		set(() => {
			return {
				preselectedCharacteristics: nodes
			}
		}),
	setDefaults: (nodes: IAccessoryNode[]) =>
		set(() => ({
			defaultCharacteristics: nodes
		})),
	checkPreselected: () =>
		set(state => {
			let stateObj: Partial<AccessoriesStore> = {
				preselectedCharacteristics: []
			}
			if (!!state.preselectedCharacteristics.length) {
				stateObj['selectedCharacteristics'] = state.preselectedCharacteristics
			}

			return stateObj
		}),
	resetCharacteristics: (codes: AccessoryCodes[]) =>
		set(state => {
			let currUpdatedSelectionsByCode: IAccessoryNode[] =
				state.selectedCharacteristics.filter(
					item => !codes.includes(item.staticCharacteristic.code)
				)

			return {
				selectedCharacteristics: currUpdatedSelectionsByCode
			}
		}),
	getSelectedIncompatible: (characteristic: IAccessoryNode) => {
		const defaultSelectedCombined: IAccessoryNode[] = [
			...get().defaultCharacteristics.filter(
				defC =>
					!get().selectedCharacteristics.find(
						sC =>
							sC.staticCharacteristic.code === defC.staticCharacteristic.code
					)
			),
			...get().selectedCharacteristics
		]
		return defaultSelectedCombined.find(
			sC =>
				!characteristic.staticCharacteristic.affectedCharacteristicsList?.find(
					cur =>
						cur.id + cur.code ===
						sC.staticCharacteristic.id + sC.staticCharacteristic.code
				)
		)
	},
	resetAll: () =>
		set(() => {
			return {
				allAccessories: {} as IAccessories,
				defaultCharacteristics: [],
				selectedCharacteristics: [],
				selectedAccessoryCodes: []
			}
		}),
	resetAllSelected: () =>
		set(() => {
			return {
				selectedCharacteristics: [],
				selectedAccessoryCodes: []
			}
		}),
	setAccessories: (accessories: IAccessories) =>
		set(() => ({
			allAccessories: accessories
		})),
	selectAccessories: (codes: AccessoryCodes[]) =>
		set(() => ({
			selectedAccessoryCodes: [...codes]
		})),
	getAccessoriesByCode: (code: AccessoryCodes) => {
		return get().allAccessories[code]?.nodes
	},
	getSelectedByCode: (code: AccessoryCodes) => {
		return get().selectedCharacteristics.find(
			sC => sC.staticCharacteristic.code === code
		)
	},
	getDefaultByCode: (code: AccessoryCodes) => {
		return get().defaultCharacteristics.find(
			dC => dC.staticCharacteristic.code === code
		)
	},
	isSelectedCharacteristic: (characteristic: IAccessoryNode) => {
		let codeInSection = false
		let existInDefaults = false
		const selectedItems: IAccessoryNode[] = get().selectedCharacteristics

		for (let i = 0; i < selectedItems.length; i++) {
			let sc = selectedItems[i]

			let inSelected = compareCharacteristic(sc, characteristic)

			if (inSelected) {
				return true
			}
		}

		codeInSection = !!selectedItems.find(
			si =>
				si.staticCharacteristic.code ===
				characteristic.staticCharacteristic.code
		)

		if (codeInSection) {
			return false
		}

		existInDefaults = !!get().defaultCharacteristics.find(dc =>
			compareCharacteristic(dc, characteristic)
		)

		return existInDefaults
	},
	getSelectedTotalPrice: () => {
		return get()
			.defaultCharacteristics.map(defC => {
				const selectedChar = get().getSelectedByCode(
					defC.staticCharacteristic.code
				)
				return (selectedChar ? selectedChar : defC).staticCharacteristic.price
			})
			.reduce((acc, price) => acc + price, 0)
	}
}))

const compareCharacteristic = (
	first: IAccessoryNode,
	second: IAccessoryNode
): boolean => {
	return (
		first.staticCharacteristic.id + first.staticCharacteristic.code ===
		second.staticCharacteristic.id + second.staticCharacteristic.code
	)
}
