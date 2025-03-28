import { Loader } from '@components/modules/page-loader/components/loader'
import { FC } from 'react'

import styles from './styles.module.scss'

export const PageLoader: FC<{ visible: boolean }> = ({ visible }) => {
	if (!visible) return null

	return (
		<div className={styles.overlay}>
			<div className={styles.wrapper}>
				<Loader size={40} />
			</div>
		</div>
	)
}
