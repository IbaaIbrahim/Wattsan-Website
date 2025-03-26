import { AllowedLangs } from '@constants/allowedLangs'
import { create } from 'zustand'

import { LanguageStore } from '../types/languages'

export const languageStore = create<LanguageStore>(set => ({
	language: AllowedLangs.EN,
	change: (newLanguage: AllowedLangs) => set(() => ({ language: newLanguage }))
}))
