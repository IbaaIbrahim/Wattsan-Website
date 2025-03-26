import { MODALS } from '@components/ui/modal/Modal'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { modalsStore } from '@store/modals'

import styles from './ResetButton.module.scss'

const ResetButton = () => {
	const { translations }: { translations: ILanguage } = useLang()

	const handleResetConf = () => {
		modalsStore.set.open(MODALS.infoModal, {
			title: translations.reset_confirm_modal.title
		})
	}

	return (
		<>
			<button
				className={`${styles['reset-btn']} button-outline`}
				onClick={handleResetConf}
			>
				{translations.accessories.actions_bar.reset}
			</button>
		</>
	)
}

export default ResetButton
