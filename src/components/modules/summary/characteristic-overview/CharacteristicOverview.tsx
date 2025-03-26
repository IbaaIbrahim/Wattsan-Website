import AccessoryTitle from '@components/modules/common/accessory-title/AccessoryTitle'
import { useLang } from '@hooks/useLang'
import { AccessoriesStore, IAccessoryNode } from '@my-types/accessories'
import { ILanguage } from '@my-types/languages'
import { accessoriesStore } from '@store/accessoriesStore'
import { useEffect, useState } from 'react'

import styles from './CharacteristicOverview.module.scss'

const CharacteristicOverview = ({
	isComparision,
	showedCount,
	filterDifferenceEnabled
}: {
	isComparision?: boolean
	showedCount?: number
	filterDifferenceEnabled?: boolean
}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const [showOnlyDifferences, setShowOnlyDifferences] = useState<boolean>(false)
	const [combinedCharacteristics, setCombinedCharacteristics] =
		useState<IAccessoryNode[]>()

	const selectedCharacteristics = accessoriesStore(
		(state: AccessoriesStore) => state.selectedCharacteristics
	)

	const defaultCharacteristics = accessoriesStore(
		(state: AccessoriesStore) => state.defaultCharacteristics
	)

	const getSelectedByBasic = (basic: IAccessoryNode): IAccessoryNode | null => {
		return (
			selectedCharacteristics?.find(
				sel => sel.staticCharacteristic.code === basic.staticCharacteristic.code
			) || null
		)
	}

	useEffect(() => {
		if (!showOnlyDifferences) {
			setCombinedCharacteristics(defaultCharacteristics)
		} else {
			setCombinedCharacteristics(
				defaultCharacteristics.slice(0, selectedCharacteristics?.length)
			)
		}
	}, [showOnlyDifferences])

	useEffect(() => {
		let basicCharacteristics: IAccessoryNode[] = []
		if (isComparision && selectedCharacteristics?.length) {
			basicCharacteristics = defaultCharacteristics.sort((a, b) => {
				const aPriority = !!selectedCharacteristics.find(
					sC => a.staticCharacteristic.code === sC.staticCharacteristic.code
				)
					? 0
					: 1
				const bPriority = !!selectedCharacteristics.find(
					sC => b.staticCharacteristic.code === sC.staticCharacteristic.code
				)
					? 0
					: 1

				return aPriority - bPriority
			})
		} else {
			basicCharacteristics = defaultCharacteristics.map(bC => {
				const changedOne = selectedCharacteristics?.find(
					sC => sC.staticCharacteristic.code === bC.staticCharacteristic.code
				)
				return changedOne ? changedOne : bC
			})
		}

		setCombinedCharacteristics(
			basicCharacteristics.slice(
				0,
				showedCount || defaultCharacteristics.length
			)
		)
	}, [defaultCharacteristics, isComparision])

	return (
		<>
			{filterDifferenceEnabled && (
				<button
					onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
					className={`${styles.checkbox} ${showOnlyDifferences ? styles['checkbox--checked'] : ''}`}
				>
					{translations.summary.buttons.show_diff}
				</button>
			)}
			{isComparision && (
				<div className={styles['comparision-header']}>
					<span className={styles['comparision-header__basic']}>
						{translations.summary.conf_tabs.basic}
					</span>
					<span className={styles['comparision-header__current']}>
						{translations.summary.conf_tabs.your_conf}
					</span>
				</div>
			)}
			{combinedCharacteristics?.map((cC, i) => {
				const selected = getSelectedByBasic(cC)
				return (
					<div
						className={styles.row}
						key={i}
					>
						<div className={styles['label-and-basic']}>
							<span className={styles['label-and-basic__label']}>
								<AccessoryTitle code={cC.staticCharacteristic.code} />
							</span>
							<span
								className={`${styles['label-and-basic__basic']} ${!isComparision && styles['label-and-basic__basic--centered']}`}
							>
								{getWithUnitIfExist(cC)}
							</span>
						</div>
						{isComparision ? (
							<div className={styles['current']}>
								{selectedCharacteristics && selected
									? getWithUnitIfExist(selected)
									: getWithUnitIfExist(cC)}
							</div>
						) : (
							<div className={styles['price']}>
								{cC.staticCharacteristic.price}
							</div>
						)}
					</div>
				)
			})}
		</>
	)
}

const getWithUnitIfExist = (characteristic: IAccessoryNode): string => {
	return (
		characteristic.staticCharacteristic.val +
		(!!characteristic.staticCharacteristic.unit
			? ' ' + characteristic.staticCharacteristic.unit
			: '')
	)
}

export default CharacteristicOverview
