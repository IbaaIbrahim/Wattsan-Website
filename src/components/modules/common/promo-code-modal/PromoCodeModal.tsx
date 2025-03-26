import { TPromoCode } from '@my-types/offers'
import copyIcon from '@public/img/icons/copy.svg'
import promoInfoIcon from '@public/img/icons/promo-info.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PromoCodeModal.module.scss'

const PromoCodeModal: FC<{ info: TPromoCode }> = ({ info }) => {
	return (
		<>
			<div className={styles.title}>{info.header}</div>
			<div className={styles.subtitle}>{info.title}</div>
			<div className={styles.description}>{info.description}</div>
			<div className={styles.expirationDate}>
				Valid until&nbsp;{info.expirationDate}
			</div>
			<button className={styles.copyCode}>
				<div className={styles.copyCodeContent}>{info.promoCode}</div>
				<Image
					src={copyIcon}
					alt=''
				/>
			</button>
			<div className={styles.termsTitle}>Terms and conditions</div>
			<div className={styles.terms}>
				{info.terms.map((term, index) => (
					<div
						key={index}
						className={styles.termsItem}
					>
						<div className={styles.termsCount}>0{index + 1}</div>
						{term}
					</div>
				))}
			</div>
			<div className={styles.promoInfo}>
				<Image
					src={promoInfoIcon}
					alt=''
				/>
				These terms may vary based on the brand's strategies and marketing
				campaigns.
			</div>
		</>
	)
}

export default PromoCodeModal
