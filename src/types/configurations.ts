export interface IConfiguration {
	status: string
	name: string
	code: string
	type: string
	id: string
	image: string
	price: string
	specification: IBasicConfiguration
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
