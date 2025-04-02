import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'

import styles from './CharacteristicCodeInfoModal.module.scss'
import { useEffect, useState } from 'react'
import { configurationsService } from '@services/configurations.service'
import { Loader } from '@components/modules/page-loader/components/loader'
import CmsContent from '@components/modules/common/cms'

const CharacteristicCodeInfoModal = ({
																			 characteristicCode
}: {
	characteristicCode: string
}) => {
	const [loading, setLoading] = useState(true)
	const [serverData, setServerData] = useState<any>({})

	useEffect(() => {
		const getData = async () => {
			const { data } = await configurationsService.getCharacteristicCodeContent(characteristicCode)
			setServerData(data)

			setLoading(false)
		}
		getData().then(r => {})
	}, [])

	if (loading) {
		return (
			<div
				className={styles.wrapper}
			>
				<Loader size={40} />
			</div>
		)
	}

	if(!(serverData?.id > 0)) {
		return (
			<div className={styles.wrapper}>
				<Typography
					className={styles.noData}
					tag='h2'
				>
					No Valid Data
				</Typography>
			</div>
		)
	}

	return (
		<div>
			{serverData?.title && (
				<Typography
					tag='h2'
				>
					{serverData?.title}
				</Typography>
			)}
			<CmsContent content={serverData?.content} />
		</div>
	)
}

export default CharacteristicCodeInfoModal
