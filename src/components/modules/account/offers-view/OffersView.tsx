'use client'

import BlankContent from '@components/modules/common/blank-content/BlankContent'
import OfferPlate from '@components/modules/common/personal-offers/offer-plate/OfferPlate'
import PromoCodePlate from '@components/modules/common/personal-offers/promo-code-plate/PromoCodePlate'
import { MODALS } from '@components/ui/modal/Modal'
import Tags from '@components/ui/tags/Tags'
import { TOffers, TPromoCodes } from '@my-types/offers'
import emptyOffers from '@public/img/account/empty-offers.svg'
import emptyPromoCodes from '@public/img/account/empty-promo-codes.svg'
import { modalsStore } from '@store/modals'
import { FC, useState } from 'react'

import styles from './OffersView.module.scss'

const OffersView: FC<{
	offersInfo: { promoCodes: TPromoCodes; offers: TOffers }
}> = ({ offersInfo }) => {
	const [filter, setFilter] = useState('0')

	const handleViewDetails = (id: string) => {
		const promoCode = offersInfo.promoCodes.find(
			promoCode => promoCode.id === id
		)

		if (promoCode === undefined) return

		modalsStore.set.open(MODALS.promoCode, { info: promoCode })
	}

	const handleViewOffer = (id: string) => {
		const offer = offersInfo.offers.find(offer => offer.id === id)

		if (offer === undefined) return

		modalsStore.set.open(MODALS.offer, { offer })
	}

	return (
		<div className={styles.page}>
			<div>
				<div className={styles.title}>Personal offers</div>
				<Tags
					size='l'
					items={[
						{ content: 'Promo codes', id: '0' },
						{ content: 'Especially for you', id: '1' }
					]}
					selected={[filter]}
					onClick={setFilter}
				/>
			</div>
			{filter === '0' &&
				(offersInfo.promoCodes.length === 0 ? (
					<BlankContent
						image={emptyPromoCodes}
						title={
							<>
								Currently, no accessible <br /> promo codes
							</>
						}
						description={
							<>
								As soon as you receive your personalized promo <br /> codes,
								they will promptly appear here.
							</>
						}
					/>
				) : (
					<div className={styles.items}>
						{offersInfo.promoCodes.map(info => (
							<PromoCodePlate
								key={info.id}
								info={info}
								onClick={handleViewDetails}
							/>
						))}
					</div>
				))}
			{filter === '1' &&
				(offersInfo.offers.length === 0 ? (
					<BlankContent
						image={emptyOffers}
						title={
							<>
								No personalized offers <br /> currently available
							</>
						}
						description={
							<>
								As soon as you receive personalized offers, they'll <br />
								instantly appear here. This might involve training <br />{' '}
								invites, software updates, exclusive learning access, <br /> and
								more.
							</>
						}
					/>
				) : (
					<div className={styles.items}>
						{offersInfo.offers.map(offer => (
							<OfferPlate
								key={offer.id}
								offer={offer}
								onClick={handleViewOffer}
							/>
						))}
					</div>
				))}
		</div>
	)
}

export default OffersView
