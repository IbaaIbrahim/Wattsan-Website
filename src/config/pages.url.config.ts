class CONFIGURATOR {
	private root = '/configurator'

	HOME = this.root
	ACCESSORIES = `/accessories`
	SUMMARY = `/summary`
}

export const CONFIGURATOR_PAGES = new CONFIGURATOR()

export const PAGES = {
	dashboard: '/dashboard',
	orders: '/orders',
	orderId: params => `/orders/${params}`,
	configurations: '/configurations',
	equipment: '/equipment',
	equipmentId: params => `/equipment/${params}`,
	comparison: '/comparison',
	offers: '/offers',
	account: '/auth',
	accountSupport: '/auth-support',
	configurator: '/configurator',
	accessoriesId: params => `/accessories/${params}`,
	summaryId: params => `/summary/${params}`,
	basket: '/basket',
	checkout: '/checkout',
	checkoutId: (id, clientId) => `${PAGES.checkout}/${id}?clientId=${clientId}`,
	logout: '/logout',
	support: '/support',
	training: '/support/training',
	faq: '/support/faq',
	checkEquipment: '/check-equipment',
	favorites: '/favorites',
	catalog: '/'
}
