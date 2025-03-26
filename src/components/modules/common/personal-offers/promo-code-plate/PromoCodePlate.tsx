import { TPromoCode } from '@my-types/offers'
import copyIcon from '@public/img/icons/copy.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PromoCodePlate.module.scss'

const PromoCodePlate: FC<{
	info: TPromoCode
	onClick: (id: string) => void
}> = ({ info, onClick }) => {
	const handleCopy = () => {
		navigator?.clipboard?.writeText(info.promoCode)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>{info.header}</div>
			<div className={styles.content}>
				<div className={styles.title}>{info.title}</div>
				<div className={styles.description}>{info.description}</div>
				<button
					className={styles.viewDetails}
					onClick={() => onClick(info.id)}
				>
					View details
				</button>
				<div className={styles.expirationDate}>
					Valid until&nbsp;{info.expirationDate}
				</div>
				<button
					className={styles.copyCode}
					onClick={handleCopy}
				>
					<div className={styles.copyCodeContent}>{info.promoCode}</div>
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
