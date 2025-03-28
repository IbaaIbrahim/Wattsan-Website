import EquipmentPreview from '@components/modules/common/equipment-preview/EquipmentPreview'
import Button from '@components/ui/button/Button'
import Status from '@components/ui/status/Status'
import { useMatchMedia } from '@hooks/useMatchMedia'
import { IOrder } from '@my-types/orders'
import { FC } from 'react'

import { PAGES } from '../../../../config/pages.url.config'
import { getOrderDate } from '../../../../utils/time'

import styles from './OrderPlate.module.scss'

const colorMap = {
	Completed: 'green',
	Current: 'yellow',
	Returns: 'purple',
	Canceled: 'red'
}

const OrderPlate: FC<{ title?: string; order: IOrder }> = ({
	title,
	order
}) => {
	const [isTablet] = useMatchMedia('max-width: 1440px')
	const [isMobile] = useMatchMedia('max-width: 768px')

	return (
		<div className={styles.plate}>
			{title && <div className={styles.title}>{title}</div>}
			<div className={styles.header}>
				<div>
					<div>№&nbsp;{order.id}</div>
					<div className={styles.createDate}>
						from&nbsp;{getOrderDate(order.createDate)}
					</div>
				</div>
				<div className={styles.price}>$ {order.price}</div>
			</div>
			<div className={styles.divider} />
			<div className={styles.footer}>
				<div>
					<div className={styles.statusWrapper}>
						<Status
							text={order.status}
							view={colorMap[order.status]}
						/>
						<span>Delivery date&nbsp;{getOrderDate(order.deliveryDate)}</span>
					</div>
					{!isMobile && (
						<Button
							// href={PAGES.orderId(order.id.replaceAll(' ', ''))}
							size='l'
						>
							View details
						</Button>
					)}
				</div>
				<EquipmentPreview
					show={isMobile ? 3 : isTablet ? 1 : 3}
					total={4}
					items={[
						'/img/grid-machines/A1.png',
						'/img/grid-machines/A1.png',
						'/img/grid-machines/A1.png'
					]}
				/>
				{isMobile && (
					<Button
						className={styles.action}
						// href={PAGES.orderId(order.id.replaceAll(' ', ''))}
						size='l'
					>
						View details
					</Button>
				)}
			</div>
		</div>
	)
}

export default OrderPlate
