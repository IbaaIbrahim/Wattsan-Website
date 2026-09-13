export interface TComparisonItem {
	id: string | number
	referenceId: number
	itemtype: 1 | 2 | 3
	name: string
	code?: string
	categoryName?: string
	categoryId?: string
	categoryTab?: 'equipment' | 'accessories'
	price: number | string
	image: string
	available?: boolean
	status?: string
	specs?: Record<string, string | number>
	rawItem?: any
}

export type TComparisonTab = 'equipment' | 'accessories'

export interface TComparisonStore {
	activeTab: TComparisonTab
	selectedCategory: string
	slotsByCategory: Record<string, (TComparisonItem | null)[]>
	showDifferencesOnly: boolean
	setActiveTab: (tab: TComparisonTab) => void
	setSelectedCategory: (category: string) => void
	setShowDifferencesOnly: (show: boolean) => void
	addToCompare: (item: TComparisonItem, categoryKey?: string, slotIndex?: number) => void
	removeFromCompare: (referenceId: number | string, itemtype?: number) => void
	setSlotItem: (categoryKey: string, slotIndex: number, item: TComparisonItem | null) => void
	clearCategory: (categoryKey: string) => void
	toggleCompare: (item: TComparisonItem, categoryKey?: string) => void
	isCompared: (referenceId: number | string, itemtype?: number) => boolean
	getTotalCount: () => number
	getTabCount: (tab: TComparisonTab) => number
	getCategoryCount: (categoryKey: string) => number
}
