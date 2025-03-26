import Button from '@components/ui/button/Button'
import { TOffer } from '@my-types/offers'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OfferPlate.module.scss'

const OfferPlate: FC<{ offer: TOffer; onClick: (id: string) => void }> = ({
	offer,
	onClick
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={offer.image}
					alt=''
					fill={true}
				/>
			</div>
			<div className={styles.tag}>{offer.tag}</div>
			<div className={styles.title}>{offer.title}</div>
			<div className={styles.description}>{offer.description}</div>
			<Button
				className={styles.view}
				view='black'
				size='l'
				onClick={() => onClick(offer.id)}
			>
				View details
			</Button>
		</div>
	)
}

export default OfferPlate
