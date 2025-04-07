export type TSeriesCharacteristic = {
	characteristicId: number
	id: number
	imageURL: string | null
	isAvailable: boolean
	isDefault: boolean
	isExisted: boolean
	series: null
	seriesId: number
	fileManger: any
	staticCharacteristic: {
		affectedCharacteristicsList: any
		category: any
		categoryId: any
		charCategory: number
		code: string
		id: number
		isActive: boolean
		name: string
		order: number
		price: any
		unit: string
		val: string
	}
}

export type TSeries = {
	id: number
	name: string
	description: string
	logo: any
	order: number
	isActive: boolean
	startPrice: number
	categoryId: number
	category: any
	seriesCharacteristics: TSeriesCharacteristic[]
}

export type TCategory = {
	id: number
	name: string
	summary: string
	order: number
	isActive: boolean
}

export type TStaticCharacteristic = {
	id: number
	name: string
	unit: string
	charCategory: number
	order: number
	code: string
	val: string
	isActive: boolean
	price: number
	categoryId: number
	category: TCategory
	affectedCharacteristicsList: any
}

export type TStartParameters = {
	series: TSeries[]
	category: TCategory[]
	staticCharacteristic: TStaticCharacteristic[]
}

export type TAffectedCharacteristic = {
	id: number
	name: string
	unit: any
	order: number
	code: string
	val: string
	isActive: boolean
	price: number
}

export type TStandartCharacteristic = {
	id: number
	seriesId: number
	series: any
	characteristicId: number
	modelId: string
	modelName: string
	staticCharacteristic: {
		id: number
		name: string
		unit: string
		charCategory: number
		order: number
		code: string
		val: string
		isActive: boolean
		price: number
		categoryId: any
		category: any
		affectedCharacteristicsList: TAffectedCharacteristic[] | null
	}
	relatedCharacteristicId?: number
	relatedStaticCharacteristic?: {
		id: number
		name: string
		unit: string
		charCategory: number
		order: number
		code: string
		val: string
		isActive: boolean
		price: number
		categoryId: any
		category: any
		affectedCharacteristicsList: TAffectedCharacteristic[] | null
	}
	isAvailable: boolean
	isDefault?: boolean
	isExisted?: boolean
	imageURL?: any
}

export type TConfigurationSuggestionsSeries = {
	type: string
	code: string
	relatedId: number
	relatedDetails: string
	suggestionId: number
	suggestionDetails: string
}

export type TConfigurationSuggestionsCharacteristics = {
	type: string
	code: string
	relatedId: number
	relatedDetails: string
	suggestionId: number
	suggestionDetails: string
}

export type TSeriesConfiguration = {
	workAreaCharacteristics: TStandartCharacteristic[]
	zAxisCharacteristics: TStandartCharacteristic[]
	spindleCharacteristics: TStandartCharacteristic[]
	spindleQuantityCharacteristics: TStandartCharacteristic[]
	spindleQuantityRelations: TStandartCharacteristic[]
	toolswithchCharacteristics: TStandartCharacteristic[]
	toolswithchRelations: TStandartCharacteristic[]
	controlSystemCharacteristics: TStandartCharacteristic[]
	motorCharacteristics: TStandartCharacteristic[]
	liquidCoolingSystemCharacteristics: TStandartCharacteristic[]
	aspirationCharacteristics: TStandartCharacteristic[]
	removableSensorCharacteristics: TStandartCharacteristic[]
	builtInSensorCharacteristics: TStandartCharacteristic[]
	vaccumTableCharacteristics: TStandartCharacteristic[]
	lubricationSystemCharacteristics: TStandartCharacteristic[]
	cabineCharacteristics: TStandartCharacteristic[]
	rotaryDeviceCharacteristics: TStandartCharacteristic[]
	rotarySeparateCharacteristics: TStandartCharacteristic[]
	rotarySeparateRelations: TStandartCharacteristic[]
	autoChangeToolsRelations: any[]
	configurationSuggestionsSeries: TConfigurationSuggestionsSeries[]
	configurationSuggestionsCharacteristics: TConfigurationSuggestionsCharacteristics[]
}

export type TSeriesConfigurations = {
	[key: number]: TSeriesConfiguration
}
