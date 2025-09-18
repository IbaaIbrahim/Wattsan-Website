import { AllowedLangs } from './allowedLangs'

export const PHONE_CODES: { [lang in AllowedLangs]: string } = {
	[AllowedLangs.EN]: '+44',
	[AllowedLangs.TUR]: '+90',
}
