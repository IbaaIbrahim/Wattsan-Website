import AccessoriesLayout from '@components/layouts/accessories/AccessoriesLayout'

export const metadata = {
	title: 'Wattsan | Configurator'
}

export default function AccessoriesWrapLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <AccessoriesLayout>{children}</AccessoriesLayout>
}
