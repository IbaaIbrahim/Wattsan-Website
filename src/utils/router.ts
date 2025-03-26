'use client'

import Router from 'next/router'

export const router = {
	/** Переход на внутреннюю страницу с перезагрузкой страницы */
	internalRedirect: (url: string) => {
		window.onbeforeunload = null

		window.location.replace(url)
	},
	/** Переход на внешнюю страницу */
	externalRedirect: (url: string) => {
		window.onbeforeunload = null

		window.location.replace(url)
	},
	/* Переход без перезагрузки */
	push: url => Router.push(url),
	/* Переход без перезагрузки и истории */
	replace: url => Router.replace(url),
	/** Перезагрузка страницы */
	reload: () => window.location.reload()
}
