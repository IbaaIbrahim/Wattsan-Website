import OrderPage from '@components/templates/OrderPage'
import { notFound } from 'next/navigation'

const Order = ({ params }: { params: { orderId: string } }) => {
	if (!params.orderId) {
		notFound()
	}

	return (
		<>
			<OrderPage orderId={params?.orderId} />
		</>
	)
}

export default Order
