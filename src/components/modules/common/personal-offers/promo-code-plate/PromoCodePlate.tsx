import { TPromoCode } from '@my-types/offers'
import copyIcon from '@public/img/icons/copy.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PromoCodePlate.module.scss'
import DOMPurify from 'dompurify'

const PromoCodePlate: FC<{
	info: TPromoCode
	onClick: (id: string) => void
}> = ({ info, onClick }) => {
	const handleCopy = () => {
		navigator?.clipboard?.writeText(info.couponCode)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>{info.couponTitle}</div>
			<div className={styles.content}>
				{/*<div className={styles.title}>{info.couponAmount}</div>*/}
				<div className={styles.description} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.parse(info?.couponDesc)) }} />
				<button
					className={styles.viewDetails}
					onClick={() => onClick(info.id)}
				>
					View details
				</button>
				<div className={styles.expirationDate}>
					Valid until&nbsp;{info.validToDate}
				</div>
				<button
					className={styles.copyCode}
					onClick={handleCopy}
				>
					<div className={styles.copyCodeContent}>{info.couponCode}</div>
					<Image
						src={copyIcon}
						alt=''
					/>
				</button>
			</div>
		</div>
	)
}

export default PromoCodePlate
