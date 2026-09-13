'use client'

import { AuthProvider } from '@components/modules/auth/auth-provider'
import MobileNavigation from '@components/modules/mobile-navigation/MobileNavigation'

import { usePathname } from 'next/navigation'
import Footer from '@components/modules/footer/Footer'
import Header from '../modules/header/Header'

import styles from './Layout.module.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const isConfiguratorPage =
		pathname === '/configurator' ||
		pathname?.includes('accessories') ||
		pathname?.includes('summary')

	return (
		<AuthProvider>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.content}>{children}</main>
			{!isConfiguratorPage && <Footer />}
			<MobileNavigation />
		</AuthProvider>
	)
}

export default Layout
