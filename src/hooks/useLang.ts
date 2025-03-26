'use client'

import { AllowedLangs } from '@constants/allowedLangs'
import engTranslations from '@public/translations/eng.json'
import turTranslations from '@public/translations/turk.json'

import { languageStore } from '../store/languageStore'
import { ILanguage, LanguageStore } from '../types/languages'

export const useLang = (): {
	lang: AllowedLangs
	translations: ILanguage
	changeLang: (newLanguage: AllowedLangs) => void
} => {
	const lang = languageStore((state: LanguageStore) => state.language)
	const changeLang = languageStore((state: LanguageStore) => state.change)
	let translations: ILanguage

	switch (lang) {
		case AllowedLangs.EN: {
			translations = engTranslations
			break
		}

		case AllowedLangs.TUR: {
			translations = turTranslations
			break
		}

		default: {
			translations = engTranslations
		}
	}

	return { lang, translations, changeLang }
}
