import eng from '@public/img/lang-icons/eng.svg'
import turk from '@public/img/lang-icons/turk.svg'

export enum AllowedLangs {
	EN = 'eng',
	TUR = 'turk'
}

export const LANG_ICONS: { [lang in AllowedLangs]: string } = {
	[AllowedLangs.EN]: eng,
	[AllowedLangs.TUR]: turk
}
