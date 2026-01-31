import { AuthProvider } from '@components/modules/auth/auth-provider'
import { Modal } from '@components/ui/modal/Modal'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import Layout from '../components/layouts/Layout'
import '../styles/globals.scss'

export const metadata: Metadata = {
	title: 'Wattsan'
}

const roboto_init = Roboto({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-roboto'
})

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html>
		<head>
			<meta name="robots" content="noindex, nofollow" />
			<meta name="googlebot" content="noindex, nofollow" />
			<title>Wattsan-cnc</title>
		</head>
		<body className={`${roboto_init.variable} roboto`}>
		<AuthProvider>
			<Layout>{children}</Layout>
					<Modal />
				</AuthProvider>
			</body>
		</html>
	)
}
