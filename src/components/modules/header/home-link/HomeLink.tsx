'use client'

import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import Link from 'next/link'

import styles from './HomeLink.module.scss'

const HomeLink = () => {
	const { translations }: { translations: ILanguage } = useLang()
	return (
		<Link
			href=''
			className={styles.container}
		>
			{translations.header.homeLink}
		</Link>
	)
}

export default HomeLink
