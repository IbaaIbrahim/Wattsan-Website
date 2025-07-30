import { Loader } from '@components/modules/page-loader/components/loader';
import Carousel from '@components/ui/carousel/Carousel';
import { useLang } from '@hooks/useLang';
import { CarouselItem } from '@my-types/carouselItem';
import { ILanguage } from '@my-types/languages';
import { configurationsService } from '@services/configurations.service';
import { useEffect, useState } from 'react';



import styles from './MediaModal.module.scss'
import { configuratorStore } from '@store/configurator'

const MediaModal = ({
	seriesId,
	modelId,
	isVideoModal
}: {
	seriesId: number
	modelId: number
	isVideoModal?: boolean
}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const [loading, setLoading] = useState(true)
	const [items, setItems] = useState([])

	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const modelName = configuratorStore.use.modelNameSelector()

	useEffect(() => {
		const getData = async () => {
			if(isVideoModal){
				const { data } = await configurationsService.getRealVideos(
					seriesId,
					modelId
				)
				setItems(data?.map(x => ({...x, videoPoster: null})))
			} else {
				const { data } = await configurationsService.getRealPhotos(
					seriesId,
					modelId
				)
				setItems(data)
			}
			setLoading(false)
		}
		getData().then(r => {})
	}, [])

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Loader size={40} />
			</div>
		)
	}

	console.log('items', items)

	return (
		<div className={styles.view}>
			<div>
				<div className={styles['modal__title']}>
					{isVideoModal
						? translations.view_videos_title
						: translations.view_photos_title}
				</div>
				<div className={styles['category']}>{categoryInfo?.name}</div>
				<div className={styles['machine-name']}>
					{machineInfo?.name} {modelName}
				</div>
			</div>
			<div className={styles['modal__content']}>
				<Carousel
					items={items}
					maxImageSize={725}
				/>
			</div>
		</div>
	)
}

export default MediaModal
