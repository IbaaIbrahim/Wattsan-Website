import OrderView from '@components/modules/basket/order-view/OrderView'
import { notFound } from 'next/navigation'

const Page = async ({ params, searchParams }) => {
	const orderId = params?.orderId
	const clientId = searchParams?.clientId

	if (!orderId || !clientId) {
		notFound()
	}

	return (
		<OrderView
			orderId={orderId}
			clientId={clientId}
		/>
	)
}

export default Page
