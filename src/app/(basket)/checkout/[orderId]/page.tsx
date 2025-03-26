import OrderView from '@components/modules/basket/order-view/OrderView'
import { basketService } from '@services/basket.service'
import { notFound } from 'next/navigation'

// TODO Вынести в вызов апи
const Page = async ({ params }: { params: { orderId: string } }) => {
	if (!params.orderId) {
		notFound()
	}

	const orderInfo = await basketService.getOrderInfo(params.orderId)

	return <OrderView orderInfo={orderInfo} />
}

export default Page
