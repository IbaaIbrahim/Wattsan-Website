import MobileNavigation from '@components/modules/mobile-navigation/MobileNavigation'

import Header from '../modules/header/Header'

import styles from './Layout.module.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.content}>{children}</main>
			<MobileNavigation />
		</>
	)
}

export default Layout
