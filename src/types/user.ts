export type TUserInfo = {
	id: string
	email: string
	userName: string // same as email
	token: string
	loginProvider: string // WattsanSite
	callbackURL: string // https://wattsancnc.com
	role: any
	firstName: string

	image: string // not exists
	fullName: string // not exists
	phone: string // not exists
	authorized: boolean // not exists
}
