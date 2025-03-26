import Sidebar from '@components/modules/account/sidebar/Sidebar'

import styles from './AccountLayout.module.scss'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={styles.container}>
			<Sidebar />
			<div className={styles.page}>{children}</div>
		</main>
	)
}

export default AccountLayout
