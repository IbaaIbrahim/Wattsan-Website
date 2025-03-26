import PaymentInfo from '@components/modules/basket/payment-info/PaymentInfo'
import SelectItems from '@components/modules/basket/select-items/SelectItems'

import styles from './OrderInfo.module.scss'

const OrderInfo = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<SelectItems />
			</div>
			<PaymentInfo
				disabled={false}
				view='preview'
			/>
		</div>
	)
}

export default OrderInfo
