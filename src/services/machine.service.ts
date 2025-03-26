import { SupportCallback } from '@my-types/supportCallback'

import { ICategory } from '../types/category'
import { IMachineItem } from '../types/machines'

const EQUIPMENTS: ICategory[] = [
	{ name: 'Laser machines', id: '1' },
	{ name: 'CNS Routes', id: '2' },
	{ name: 'Laser markers', id: '3' },
	{ name: 'Metal Cutters', id: '4' },
	{ name: 'Laser welding', id: '5' },
	{ name: 'Laser Cleaning', id: '6' },
	{ name: 'Laser pipe cutting', id: '7' },
	{ name: 'Hidraulic press brakes', id: '8' }
]

export const MACHINES: IMachineItem[] = [
	{
		name: 'Mini',
		description:
			'Tabletop milling machine for processing materials of small area. Ideal for quick production setup.',
		workAreaIds: ['1', '2'],
		categoryIds: ['2'],
		isActive: false,
		price: 'from 1000$',
		imgUrl: '/img/grid-machines/Mini.png',
		id: '11'
	},
	{
		name: 'Mini Cabine',
		description:
			'Compact tabletop CNC milling machine with a cabin, designed for educational institutions.',
		workAreaIds: ['1', '2'],
		categoryIds: ['2'],
		isActive: false,
		price: 'from 1500$',
		imgUrl: '/img/grid-machines/Mini-Cabine.png',
		id: '12'
	},
	{
		name: 'A1',
		description:
			'The A1 series milling machine is classified as professional milling equipment. Its design allows for additional customization to specific tasks.',
		workAreaIds: ['2', '3', '4', '5'],
		categoryIds: ['2'],
		isActive: false,
		price: 'from 2000$',
		imgUrl: '/img/grid-machines/A1.png',
		id: '13'
	},
	{
		name: 'M1',
		description:
			'The M1 series milling machine features a more stable frame, significantly reducing the defect rate and improving the quality of the finished product.',
		workAreaIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
		categoryIds: ['2'],
		isActive: true,
		price: 'from 3000$',
		imgUrl: '/img/grid-machines/M1.png',
		id: '4'
	},
	{
		name: 'M1 S',
		description:
			'The M1 S series milling machine can be equipped with multiple spindles, which will increase productivity several times over.',
		workAreaIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
		categoryIds: ['2'],
		isActive: false,
		price: 'from 3500$',
		imgUrl: '/img/grid-machines/M1-S.png',
		id: '15'
	},
	{
		name: 'M1 RD',
		description:
			'M1 RD series milling machines are equipped with a rotary device for processing balusters and other cylindrical items.',
		workAreaIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
		categoryIds: ['2'],
		isActive: false,
		price: 'from 4000$',
		imgUrl: '/img/grid-machines/M1-RD.png',
		id: '16'
	},
	{
		name: 'M3',
		description:
			'The M3 series milling machine is utilized in a continuous industrial workshop for working with soft metals, primarily aluminum.',
		workAreaIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
		categoryIds: ['2'],
		isActive: true,
		price: 'from 5000$',
		imgUrl: '/img/grid-machines/M3.png',
		id: '17'
	}
]

class MachineService {
	private BASE_URL = ''

	async getEquipments() {
		const response = await Promise.resolve(EQUIPMENTS)
		return response
	}

	async getMachines() {
		const response = await Promise.resolve(MACHINES)
		return response
	}

	async machineRequest(seriesId: string, clientInfo: SupportCallback) {
		console.log(seriesId, clientInfo)
		const response = await Promise.resolve('success')
		return response
	}

	async getMachineById(id: string): Promise<IMachineItem | null> {
		const machine = MACHINES.find(m => m.id === id)
		const response = await Promise.resolve(machine)
		if (response) {
			return response
		}
		return null
	}

	async getRecMachines(): Promise<IMachineItem[]> {
		const response = await Promise.resolve([MACHINES[MACHINES.length - 1]])
		return response
	}

	async getRandomMachine(): Promise<IMachineItem> {
		let randomIndex = getRandomInt(0)
		const response = await Promise.resolve(MACHINES[randomIndex])
		return response
	}
}

function getRandomInt(min: number, max: number = MACHINES.length - 1): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	// The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const machineService = new MachineService()
