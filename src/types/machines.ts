import { ICategory } from './category'
import { IWorkingArea } from './workingArea'

export interface IMachineItem {
	name: string
	description: string
	categoryIds: string[]
	workAreaIds: string[]
	price: string
	imgUrl: string
	id: string
	isActive: boolean
}

export type MachinesStore = {
	machines: IMachineItem[]
	filteredMachines: IMachineItem[]
	categories: ICategory[]
	workingAreas: IWorkingArea[]
	initMachines: (machines: IMachineItem[]) => void
	initCategories: (categories: ICategory[]) => void
	initWorkingAreas: (workingAreas: IWorkingArea[]) => void
	isCategoryWithMachines: (category: ICategory) => boolean
	changeWorkingAreaLabel: (workingArea: IWorkingArea) => void
	selectCategory: (category: ICategory) => void
	selectWorkingArea: (workingArea: IWorkingArea) => void
	selectAllWorkingAreas: () => void
}
