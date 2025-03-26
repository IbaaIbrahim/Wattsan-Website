import AccountLayout from '@components/layouts/account/AccountLayout'
import React from 'react'

export default function AccountWrapLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <AccountLayout>{children}</AccountLayout>
}
