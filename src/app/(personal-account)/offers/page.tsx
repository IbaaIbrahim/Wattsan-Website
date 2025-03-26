import OffersView from '@components/modules/account/offers-view/OffersView'
import { offersService } from '@services/offers.service'

const Offers = async () => {
	const offersInfo = await offersService.getOffers()

	return (
		<>
			<OffersView offersInfo={offersInfo} />
		</>
	)
}

export default Offers
