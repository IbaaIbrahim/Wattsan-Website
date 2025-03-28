'use client'

import BlogPlate from '@components/modules/basket/blog-plate/BlogPlate'
import LearningLink from '@components/modules/basket/learning-link/LearningLink'
import VideoPlate from '@components/modules/basket/video-plate/VideoPlate'
import OrderPlate from '@components/modules/orders/order-plate/OrderPlate'
import { basketStore } from '@store/basket'
import { getOrder } from '@store/basket/actions'
import { FC, useEffect } from 'react'

import styles from './OrderView.module.scss'

const OrderView: FC<{ clientId: string; orderId: string }> = ({
	clientId,
	orderId
}) => {
	useEffect(() => {
		getOrder({ clientId, id: orderId })
	}, [clientId, orderId])

	const order = basketStore.use.order()
	const totalPrice = basketStore.use.orderTotalPriceSelector()

	return (
		<div className={styles.page}>
			<div className={styles.title}>Order has been placed</div>
			<OrderPlate
				order={{
					id: order?.id,
					price: totalPrice,
					status: '1',
					deliveryDate: order?.deliveryDate,
					createDate: order?.fromDate
				}}
			/>
			<div className={styles.sectionTitle}>Start learning the equipment</div>
			<div className={styles.sectionParagraph}>
				Here, you can begin studying the equipment. Our lessons will help you
				get comfortable with the device, fully unlocking its potential.
			</div>
			<div className={styles.steps}>
				{/*{orderInfo.steps.map(({ url, title, subtitle }) => (*/}
				{/*	<LearningLink*/}
				{/*		key={url}*/}
				{/*		title={title}*/}
				{/*		subtitle={subtitle}*/}
				{/*		url={url}*/}
				{/*	/>*/}
				{/*))}*/}
			</div>
			<div className={styles.sectionTitle}>Discover more on our YouTube</div>
			<div className={styles.sectionParagraph}>
				Our experts share secrets, tips, and practical skills for using
				equipment. Subscribe to our channel and stay updated with all the latest
				content.
			</div>
			{/*{orderInfo.video.videoSrc && (*/}
			{/*	<VideoPlate*/}
			{/*		videoSrc={orderInfo.video.videoSrc}*/}
			{/*		preview={orderInfo.video.preview}*/}
			{/*		title={orderInfo.video.title}*/}
			{/*	/>*/}
			{/*)}*/}
			<div className={styles.sectionTitle}>Explore our blog</div>
			<div className={styles.sectionParagraph}>
				Explore valuable insights while delving into practical examples of using
				our equipment, and stay updated on its applications and advancements.
			</div>
			{/*<BlogPlate posts={orderInfo.blog} />*/}
		</div>
	)
}

export default OrderView
