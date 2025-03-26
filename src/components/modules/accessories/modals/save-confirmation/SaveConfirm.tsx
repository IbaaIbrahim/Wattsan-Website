import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SaveConfirm.module.scss'

const SaveConfirmModal = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.modal}>
			<div className={styles['modal__title']}>
				{translations.save_confirm_modal.title}
			</div>
			<p className={styles['modal__description']}>
				{translations.save_confirm_modal.description}
			</p>
		</div>
	)
}

export default SaveConfirmModal
