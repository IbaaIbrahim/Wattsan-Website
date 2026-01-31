import { TOffer } from '@my-types/offers'
import copyIcon from '@public/img/icons/copy.svg'
import promoInfoIcon from '@public/img/icons/promo-info.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OfferModal.module.scss'

const OfferModal: FC<{ offer: TOffer }> = ({ offer }) => {
	return (
		<div>
			<div className={styles.title}>{offer.title}</div>
			<div className={styles.description}>{offer.description}</div>
			<div className={styles.subtitle}></div>
			<button className={styles.copyCode}>
				<div className={styles.copyCodeContent}>AutoCAD</div>
				<Image
					src={copyIcon}
					alt=''
				/>
			</button>
			<button className={styles.copyCode}>
				<div className={styles.copyCodeContent}>AutoCAD</div>
				<Image
					src={copyIcon}
					alt=''
				/>
			</button>
			<div className={styles.termsTitle}>Terms and conditions</div>
			<div className={styles.terms}>
				{offer.terms.map((term, index) => (
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
		</div>
	)
}

export default OfferModal
