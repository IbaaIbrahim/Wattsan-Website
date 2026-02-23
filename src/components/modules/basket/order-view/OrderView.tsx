'use client'

import BlogPlate from '@components/modules/basket/blog-plate/BlogPlate'
import LearningLink from '@components/modules/basket/learning-link/LearningLink'
import VideoPlate from '@components/modules/basket/video-plate/VideoPlate'
import OrderPlate from '@components/modules/orders/order-plate/OrderPlate'
import FilesSection from '@components/modules/support/files-section/FilesSection'
import fileIcon from '@public/img/support/file-icon.png'
import imageIcon from '@public/img/support/image-icon.png'
import videoIcon from '@public/img/support/video-icon.png'
import { basketStore } from '@store/basket'
import { getModelYoutubeLink, getOrder, getSupportAssetsByTag } from '@store/basket/actions'
import { FC, useEffect, useState } from 'react'

import styles from './OrderView.module.scss'
import { IOrder, IOrderInfo } from '@my-types/orders'
import _ from 'lodash'

const OrderView: FC<{ clientId: string; orderId: string }> = ({
	clientId,
	orderId
}) => {
	const [youtubeLinks, setYoutubeLinks] = useState<Record<string, any>>({})
	const [supportSections, setSupportSections] = useState<any[]>([])

	useEffect(() => {
		getOrder({ clientId, id: orderId })
	}, [clientId, orderId])

	const order: IOrder = basketStore.use.order()
	const totalPrice = basketStore.use.orderTotalPriceSelector()

	useEffect(() => {
		if (!order) return
		order?.orderProducts?.forEach(async (product: IOrderInfo) => {
			const { referenceObject } = product
			const modelId = referenceObject?.workArea
			const seriesId = referenceObject?.seriesId

			const modelYouTubeLink = await getModelYoutubeLink({ modelId, seriesId })
			setYoutubeLinks((prev) => {
				return { ...prev, [`${seriesId}-${modelId}`]: modelYouTubeLink }
			})

			const supportAsset = await getSupportAssetsByTag(`tag_${seriesId}_${modelId}`)
			if (supportAsset && supportAsset.id > 0) {
				const files = supportAsset.supportFiles.filter((x: any) => x.categoryType === 2) // Education materials
				const sections = files.filter((x: any) => x.parentId === null)

				const formattedSections = sections.map((section: any) => ({
					id: section.id,
					name: section.title,
					description: section.stepName,
					links: files.filter((x: any) => x.parentId === section.id).map((x: any) => ({
						id: x.id,
						icon: x.fileType === 1 ? imageIcon : (x.fileType === 2 ? videoIcon : fileIcon),
						name: x.title,
						description: x.stepName,
						url: x?.fileManager?.url ?? ''
					}))
				}))

				setSupportSections(prev => {
					// Avoid duplicates based on ID
					const newSections = formattedSections.filter((fs: any) => !prev.some(p => p.id === fs.id))
					return [...prev, ...newSections]
				})
			}
		})
	}, [order])

	return (
		<div className={styles.page}>
			<div className={styles.title}>Order has been placed</div>
			<OrderPlate
				order={order}
			/>
			{
				supportSections.length > 0 && (
					<>
						<div className={styles.sectionTitle}>Start learning the equipment</div>
						<div className={styles.sectionParagraph}>
							Here, you can begin studying the equipment. Our lessons will help you
							get comfortable with the device, fully unlocking its potential.
						</div>
						<div className={styles.steps}>
							{supportSections.map((section) => (
								<FilesSection
									key={section.id}
									info={section}
								/>
							))}
						</div>
					</>
				)
			}
			{_.size(youtubeLinks) > 0 && (
				<>
					<div className={styles.sectionTitle}>Discover more on our YouTube</div>
					<div className={styles.sectionParagraph}>
						Our experts share secrets, tips, and practical skills for using
						equipment. Subscribe to our channel and stay updated with all the latest
						content.
					</div>

					<div className={styles.videoSlider}>
						{_.map(youtubeLinks, (link, key) => (
							<VideoPlate
								key={key}
								videoSrc={link.youtubeLink}
								preview={link.preview || ''}
								title={link.title || ''}
							/>
						))}
					</div>
				</>
			)}
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
