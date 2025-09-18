export type TUserInfo = {
	id: string
	email: string
	userName: string // same as email
	token: string
	loginProvider: string // WattsanSite
	callbackURL: string // https://wattsancnc.com
	role: any
	firstName: string
	firstname: string 

	image: string // not exists
	fullName: string // not exists
	phone: string // not exists
	phoneNumber: string
	authorized: boolean // not exists
	fileManagerId: string | null
}
