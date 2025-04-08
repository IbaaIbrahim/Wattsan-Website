interface ICharacteristicItem {
	"id": string | number,
	"name": string | number,
	"description": string | number,
	"logo": string | number,
	"order": string | number,
	"isActive": boolean,
	"startPrice": string | number,
	"categoryId": string | number,
	"category": string | number,
	"seriesCharacteristics": any
	"affectedCharacteristicsList": any
}
export interface IConfiguration {
	"id": string | number,
	"configurationName": string,
	"clientId": string,
	"client": null,
	"seriesId": number,
	"series": ICharacteristicItem
	"workArea": number,
	"workAreaChar": ICharacteristicItem
	"zAxis": number,
	"zAxisChar": ICharacteristicItem
	"toolSwitch": number,
	"toolSwitchChar": ICharacteristicItem
	"spindle": number,
	"spindleChar": ICharacteristicItem
	"spindleQuantity": number,
	"spindleQuantityChar": ICharacteristicItem
	"motor": number,
	"motorChar": ICharacteristicItem
	"controlSystem": number,
	"controlSystemChar": ICharacteristicItem
	"liquidCoolingSystem": number,
	"liquidCoolingSystemChar": ICharacteristicItem
	"removableSensor": number,
	"removableSensorChar": ICharacteristicItem
	"buildInSensor": number,
	"buildInSensorChar": ICharacteristicItem
	"lubrucationSystem": number,
	"lubrucationSystemChar": ICharacteristicItem
	"aspiration": number,
	"aspirationChar": ICharacteristicItem
	"vaccumTable": number,
	"vaccumTableChar": ICharacteristicItem
	"rotaryDevice": number,
	"rotaryDeviceChar": ICharacteristicItem
	"cabine": number,
	"cabineChar": ICharacteristicItem
	"rotarySeparate": number,
	"rotarySeparateChar": ICharacteristicItem
	"autoChangeTools": null,
	"autoChangeToolsChar": ICharacteristicItem
	"status": number,
	"fileMangerId": string | number,
	"fileManger": any,
	"modelName": string,
	"modelId": string | number,
	"price": number
}

export interface IBasicConfiguration {
	[key: string]: string
}

export interface ITemplate {}

export interface IPopularTemplate {
	tags: string[]
	name: string
	code: string
	specialization: string
	id: string
	image: string
	description: {
		title: string
		content: string
		preview: string
		price: string
	}
}

export interface IMyTemplate extends IPopularTemplate {}

export type TPopularTemplates = IPopularTemplate[]
export type TMyTemplates = IMyTemplate[]

export type TGetConfigurations = {
	basicSpecification: IBasicConfiguration
	configurations: IConfiguration[]
	myTemplates: TMyTemplates
	popularTemplates: TPopularTemplates
}

export interface IConfigurationsStore {
	configurationsFilter: string[]
	changeFilter: (id: string) => void
	configurations: IConfiguration[]
	templates: ITemplate[]
	templatesFilter: string[]
	changeTemplatesFilter: (id: string) => void
	popularTemplates: IPopularTemplate[]
}
