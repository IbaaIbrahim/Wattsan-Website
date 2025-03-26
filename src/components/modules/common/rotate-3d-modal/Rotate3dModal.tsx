import { useLang } from '@hooks/useLang'
import { IOverview } from '@my-types/accessories'
import { ILanguage } from '@my-types/languages'

import ShareLinks from '../share-links/ShareLinks'

import styles from './Rotate3dModal.module.scss'
import ModelViewer from './model-viewer/ModelViewer'

const Rotate3dModal = () => {
	const { translations }: { translations: ILanguage } = useLang()

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
				src='/3d-models/compressed.glb'
				alt='3d wattsan model'
				autoRotate
				cameraControls
			/>
			<ShareLinks />
		</div>
	)
}

export default Rotate3dModal
