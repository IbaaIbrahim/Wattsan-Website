'use client'

import RecommendationModal from '@components/modules/accessories/modals/recomendation/RecommendationModal'
import AuthModal from '@components/modules/auth/auth-modal/AuthModal'
import ChangeNameModal from '@components/modules/common/change-name-modal/ChangeNameModal'
import ConfigurationComparisonModal from '@components/modules/common/configuration-comparison-modal/ConfigurationComparisonModal'
import DeleteAccountModal from '@components/modules/common/delete-account-modal/DeleteAccountModal'
import DeleteConfigurationModal from '@components/modules/common/delete-configuration-modal/DeleteConfigurationModal'
import DeleteSuccessModal from '@components/modules/common/delete-success-modal/DeleteSuccessModal'
import DuplicateConfigurationModal from '@components/modules/common/duplicate-configuration-modal/DuplicateConfigurationModal'
import EndSessionModal from '@components/modules/common/end-session-modal/EndSessionModal'
import InfoModal from '@components/modules/common/info-modal/InfoModal'
import MediaModal from '@components/modules/common/media-modal/MediaModal'
import OfferModal from '@components/modules/common/offer-modal/OfferModal'
import OrderDownloadModal from '@components/modules/common/order-download-modal/OrderDownloadModal'
import OrderRepeatModal from '@components/modules/common/order-repeat-modal/OrderRepeatModal'
import OrderRepeatSuccessModal from '@components/modules/common/order-repeat-success-modal/OrderRepeatSuccessModal'
import PromoCodeModal from '@components/modules/common/promo-code-modal/PromoCodeModal'
import RegisterSuccessModal from '@components/modules/common/register-success-modal/RegisterSuccessModal'
import RequestCallbackModal from '@components/modules/common/request-callback-modal/RequestCallbackModal'
import RequestModal from '@components/modules/common/request-modal/RequestModal'
import RequestSupportModal from '@components/modules/common/request-support-modal/RequestSupportModal'
import ReturnOrderModal from '@components/modules/common/return-order-modal/ReturnOrderModal'
import ReturnOrderSuccessModal from '@components/modules/common/return-order-success-modal/ReturnOrderSuccessModal'
import Rotate3dModal from '@components/modules/common/rotate-3d-modal/Rotate3dModal'
import SaveResultModal from '@components/modules/common/save-result/SaveResult'
import TemplateReadMoreModal from '@components/modules/common/template-read-more-modal/TemplateReadMoreModal'
import AddToBasketModal from '@components/modules/summary/modals/add-to-basket-modal/AddToBasketModal'
import { ComparisonModal } from '@components/modules/summary/modals/comparison-modal/ComparisonModal'
import ConfigNameModal from '@components/modules/summary/modals/config-name-modal/ConfigNameModal'
import { ConfigurationModal } from '@components/modules/summary/modals/configuration-modal/ConfigurationModal'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import closeIcon from '@public/img/icons/close.svg'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import cn from './Modal.module.scss'

import styles from '@components/ui/modal/new/styles.module.scss'
import CharacteristicCodeInfoModal
	from '@components/modules/common/characteristic-code-info-modal/CharacteristicCodeInfoModal'

export const MODALS = {
	login: 'login',
	downloadReceipt: 'downloadReceipt',
	orderRepeat: 'orderRepeat',
	returnOrder: 'returnOrder',
	promoCode: 'promoCode',
	offer: 'offer',
	changeName: 'changeName',
	endSession: 'endSession',
	deleteSuccess: 'deleteSuccess',
	deleteAccount: 'deleteAccount',
	orderRepeatSuccess: 'orderRepeatSuccess',
	returnOrderSuccess: 'returnOrderSuccess',
	requestSupport: 'requestSupport',
	requestCallback: 'requestCallback',
	rotate3d: 'rotate3d',
	mediaModal: 'mediaModal',
	infoModal: 'infoModal',
	characteristicCodeInfoModal: 'characteristicCodeInfoModal',
	configurationComparisonModal: 'configurationComparisonModal',
	templateReadMoreModal: 'templateReadMoreModal',
	duplicateConfigurationModal: 'duplicateConfigurationModal',
	deleteConfigurationModal: 'deleteConfigurationModal',
	saveResultModal: 'saveResultModal',
	configurationModal: 'configurationModal',
	comparisonModal: 'comparisonModal',
	recommendationModal: 'recommendationModal',
	requestModal: 'requestModal',
	configNameModal: 'configNameModal',
	registerSuccessModal: 'registerSuccessModal',
	addToBasketModal: 'addToBasketModal'
}

const MODAL_COMPONENTS = {
	[MODALS.login]: AuthModal,
	[MODALS.downloadReceipt]: OrderDownloadModal,
	[MODALS.orderRepeat]: OrderRepeatModal,
	[MODALS.returnOrder]: ReturnOrderModal,
	[MODALS.promoCode]: PromoCodeModal,
	[MODALS.offer]: OfferModal,
	[MODALS.changeName]: ChangeNameModal,
	[MODALS.endSession]: EndSessionModal,
	[MODALS.deleteSuccess]: DeleteSuccessModal,
	[MODALS.deleteAccount]: DeleteAccountModal,
	[MODALS.orderRepeatSuccess]: OrderRepeatSuccessModal,
	[MODALS.returnOrderSuccess]: ReturnOrderSuccessModal,
	[MODALS.requestSupport]: RequestSupportModal,
	[MODALS.requestCallback]: RequestCallbackModal,
	[MODALS.rotate3d]: Rotate3dModal,
	[MODALS.mediaModal]: MediaModal,
	[MODALS.infoModal]: InfoModal,
	[MODALS.characteristicCodeInfoModal]: CharacteristicCodeInfoModal,
	[MODALS.configurationComparisonModal]: ConfigurationComparisonModal,
	[MODALS.templateReadMoreModal]: TemplateReadMoreModal,
	[MODALS.duplicateConfigurationModal]: DuplicateConfigurationModal,
	[MODALS.deleteConfigurationModal]: DeleteConfigurationModal,
	[MODALS.saveResultModal]: SaveResultModal,
	[MODALS.configurationModal]: ConfigurationModal,
	[MODALS.comparisonModal]: ComparisonModal,
	[MODALS.recommendationModal]: RecommendationModal,
	[MODALS.requestModal]: RequestModal,
	[MODALS.configNameModal]: ConfigNameModal,
	[MODALS.registerSuccessModal]: RegisterSuccessModal,
	[MODALS.addToBasketModal]: AddToBasketModal
}

const MODAL_SIZES: any = {
	[MODALS.login]: 'm',
	[MODALS.downloadReceipt]: 'm',
	[MODALS.orderRepeat]: 'l',
	[MODALS.returnOrder]: 'l',
	[MODALS.promoCode]: 'l',
	[MODALS.offer]: 'l',
	[MODALS.changeName]: 'm',
	[MODALS.endSession]: 'm',
	[MODALS.deleteSuccess]: 'm',
	[MODALS.deleteAccount]: 'm',
	[MODALS.orderRepeatSuccess]: 'm',
	[MODALS.returnOrderSuccess]: 'm',
	[MODALS.rotate3d]: 'full',
	[MODALS.mediaModal]: 'full',
	[MODALS.infoModal]: 'm',
	[MODALS.characteristicCodeInfoModal]: 'l',
	[MODALS.configurationComparisonModal]: 'l',
	[MODALS.templateReadMoreModal]: 'l',
	[MODALS.duplicateConfigurationModal]: 'm',
	[MODALS.deleteConfigurationModal]: 'm',
	[MODALS.saveResultModal]: 'l',
	[MODALS.configurationModal]: 'l',
	[MODALS.comparisonModal]: 'l',
	[MODALS.recommendationModal]: 'm',
	[MODALS.requestModal]: 'm',
	[MODALS.configNameModal]: 'm',
	[MODALS.registerSuccessModal]: 'm',
	[MODALS.addToBasketModal]: 'm'
}

export const Modal = () => {
	const pathname = usePathname()

	const modal = modalsStore.use.modal()
	const disabled = modalsStore.use.disabled()

	useEffect(() => {
		modalsStore.set.close()
	}, [pathname])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key == 'Escape' && modal.props?.closeOnEscape && !disabled) {
				modalsStore.set.close()
			}
		}

		window.addEventListener('keydown', handleEscape)

		return () => window.removeEventListener('keydown', handleEscape)
	}, [modal.name])

	const [open, setOpen] = useState(false)

	const handleClose = () => {
		if (!disabled) {
			modalsStore.set.close()
			setOpen(false)
		}
	}

	useEffect(() => {
		if (modal?.name) {
			setOpen(true)
		}
	}, [modal?.name])

	const ModalComponent = useMemo(() => {
		return MODAL_COMPONENTS?.[modal?.name] ?? null
	}, [modal?.name])

	if (!modal.name) return null

	return (
		<Dialog
			open={open}
			className={cn.dialog}
			onClose={handleClose}
		>
			<DialogBackdrop className={cn.overlay} />
			<div className={cn.wrapper}>
				<DialogPanel
					className={clsx(cn.modal, cn[MODAL_SIZES[modal.name] ?? 'l'])}
				>
					<button
						className={cn.close}
						onClick={handleClose}
					>
						<Image
							src={closeIcon}
							alt=''
						/>
					</button>
					<div className={cn.contentWrapper} style={modal?.props?.styles ?? {}}>
						<ModalComponent {...modal.props} />
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}
