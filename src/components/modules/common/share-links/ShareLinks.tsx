import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import attatchIcon from '@public/img/icons/attatch.svg'
import fSocialIcon from '@public/img/icons/f-social.svg'
import inSocialIcon from '@public/img/icons/in-social.svg'
import instagramIcon from '@public/img/icons/instagram.svg'
import Image from 'next/image'

import styles from './ShareLinks.module.scss'

const ShareLinks = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles['share-links']}>
			<span className={styles['share-links__label']}>
				{translations.summary.buttons.share_label}
			</span>
			<div className={styles['share-links__links']}>
				<Image
					className={styles['share-link']}
					src={instagramIcon}
					alt=''
				></Image>
				<Image
					className={styles['share-link']}
					src={inSocialIcon}
					alt=''
				></Image>
				<Image
					className={styles['share-link']}
					src={fSocialIcon}
					alt=''
				></Image>
				<Image
					className={styles['share-link']}
					src={attatchIcon}
					alt=''
				></Image>
			</div>
		</div>
	)
}

export default ShareLinks
