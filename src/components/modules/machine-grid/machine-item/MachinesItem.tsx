import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { SupportCallback } from '@my-types/supportCallback'
import { getInitialSeriesConfiguration } from '@store/configurator/actions'
import { TSeries } from '@store/configurator/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CONFIGURATOR_PAGES } from '../../../../config/pages.url.config'

import styles from './MachinesItem.module.scss'

const MachinesItem = ({
	machineData,
	category
}: {
	machineData: TSeries & any
	category: any
}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const router = useRouter()

	const characteristicByWorkArea = machineData?.seriesCharacteristics?.filter?.(
		({ code, isAvailable, isDefault }: any) => {

			return code === 'WorkArea' && isAvailable && isDefault
		}
	)

	// const makeRequest = async (clientInfo: SupportCallback) => {
	// 	await machineService.machineRequest(machineData.id, clientInfo)
	// 	// openDialog({
	// 	// 	okText: translations.request_result_modal.confirm_btn_text,
	// 	// 	onOk: () => closeAll(),
	// 	// 	isValid: true,
	// 	// 	children: (
	// 	// 		<CharacteristicCodeInfoModal
	// 	// 			title={translations.request_result_modal.title}
	// 	// 			description={translations.request_result_modal.description}
	// 	// 			providedContact={clientInfo.phone}
	// 	// 		/>
	// 	// 	)
	// 	// })
	// }

	const handleOnEdit = async () => {

		if (!machineData.isActive) {
			let clientInfo: SupportCallback = { fullname: '', phone: '' }

			const updateClientInfo = (currentInfo: SupportCallback) => {
				clientInfo = { ...currentInfo }
			}

			const setValidation = (state: boolean) => {
				// setValidState(state)
			}

			// openDialog({
			// 	okText: translations.request_modal.ok_btn,
			// 	cancelText: translations.request_modal.cansel_btn,
			// 	onOk: () => {
			// 		makeRequest(clientInfo)
			// 	},
			// 	children: (
			// 		<RequestModal
			// 			currentItem={machineData.name}
			// 			onChange={updateClientInfo}
			// 			onValidationChange={setValidation}
			// 		/>
			// 	)
			// })
			return
		}
		router.push(
			`${CONFIGURATOR_PAGES.ACCESSORIES}?machineId=${machineData.id}&categoryId=${category}`
		)
	}

	return (
		<article className={styles.container}>
			<div className={styles['main-content']}>
				<div className={styles['main-content__img']}>
					<Image
						src={machineData.logo?.src ?? '/img/grid-machines/icon-for-mini-equipment.png'}
						alt=''
						fill
						sizes='(max-width: 120px)'
						priority
					/>
				</div>
				<div
					className={`${styles['main-content__about']} ${styles['machine-about']}`}
				>
					<div className={styles['machine-about__info']}>
						<span className={styles.title}>
							<span>{machineData.name}</span>
							<span className={styles.price}>
								from ${machineData.startPrice}
							</span>
						</span>
						<span className={styles.description}>
							<span>{machineData.description}</span>
						</span>
					</div>
					<button
						className={`button-black ${styles['edit-btn']}`}
						onClick={handleOnEdit}
					>
						{translations.machines.edit_btn}
					</button>
				</div>
			</div>
			<div className={styles['area-sizes']}>
				<span className={styles['area-sizes__label']}>
					{translations.machines.area_sizes}
				</span>
				<span className={styles['area-sizes__values']}>
					{characteristicByWorkArea?.map(({ name }) => (
						<div
							key={name}
							className={styles['area-value']}
						>
							<span className={styles['area-value__text']}>{name}</span>
						</div>
					))}
				</span>
			</div>
		</article>
	)
}

export default MachinesItem
