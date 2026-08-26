import Button from '@components/ui/button/Button'
import { IOrder, IOrderInfo } from '@my-types/orders'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OrderItemPlate.module.scss'
import { getStatus } from '@constants/order-status'

const OrderItemPlate: FC<{
	item: IOrderInfo
}> = ({ item }) => {
	const status = getStatus(item)
	const refObj: any = item?.referenceObject

	const categoryOrSeries = refObj?.series?.name || refObj?.series?.category?.name || 'Wattsan Machine'
	const name = refObj?.configurationName || refObj?.name || (refObj?.series?.name ? `${refObj.series.name} ${refObj.name || ''}` : `Item #${item.referenceId}`)
	const model = refObj?.modelName || (refObj?.workAreaChar?.name ?? '')
	const imageUrl = refObj?.fileManger?.url || refObj?.attachments?.[0]?.fileManager?.url || refObj?.image || '/img/catalog/cnc-routes.png'

	return (
		<div className={styles.plate}>
			<div className={styles.content}>
				<div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
					<img
						src={imageUrl}
						width={100}
						height={100}
						alt=''
						style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: 8 }}
					/>
				</div>
				<div className={styles.info}>
					<div className={styles.name}>{categoryOrSeries}</div>
					<div className={styles.code}>
						{name} {model ? `(${model})` : ''}
					</div>
					<div className={styles.price}>${(item.quantity || 1) * (item.price || 0)}</div>
					{status && (
						<div
							style={{
								display: 'inline-block',
								marginTop: 8,
								backgroundColor: status.color,
								color: 'white',
								padding: '2px 8px',
								borderRadius: 10,
								fontSize: 12,
								fontWeight: 600
							}}
						>
							{status.label}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default OrderItemPlate
