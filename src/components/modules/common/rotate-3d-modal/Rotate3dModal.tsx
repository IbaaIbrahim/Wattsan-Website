import { useLang } from '@hooks/useLang'
import { IOverview } from '@my-types/accessories'
import { ILanguage } from '@my-types/languages'

import ShareLinks from '../share-links/ShareLinks'

import styles from './Rotate3dModal.module.scss'
import ModelViewer from './model-viewer/ModelViewer'
import { useEffect, useState } from 'react'
import { configurationsService } from '@services/configurations.service'
import { Loader } from '@components/modules/page-loader/components/loader'

const Rotate3dModal = ({seriesId, modelId}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const [loading, setLoading] = useState(true)
	const [item, setItem] = useState<any>({})
	const [modelSrc, setModelSrc] = useState('');

	useEffect(() => {
		// Encode the URL properly
		const encodedUrl = encodeURIComponent(
			'https://api.wattsancnc.com/Attachments/20250330141112072.glb'
		);
		setModelSrc(`/api/proxy?url=${encodedUrl}`);
	}, []);

	useEffect(() => {
		const getData = async () => {
			const { data } = await configurationsService.get3dModel(
				seriesId,
				modelId
			)
			const encodedUrl = encodeURIComponent(
				data?.fileManger?.url
			);
			setModelSrc(`/api/proxy?url=${encodedUrl}`);
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

	return (
		<div className={styles.view}>
			<div className={styles.header}>
				<div className={styles['modal__title']}>
					{translations.rotate_modal_title}
				</div>
				<div className={styles['category']}>CNC Router Machine</div>
				<div className={styles['machine-name']}>M1 6090 modified</div>
			</div>
			<ModelViewer
				className={styles.modelViewer}
				src={modelSrc}
				alt='3d wattsan model'
				autoRotate
				cameraControls
			/>
			<ShareLinks />
		</div>
	)
}

export default Rotate3dModal
