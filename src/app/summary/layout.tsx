import styles from './layout.module.scss'

export const metadata = {
	title: 'Wattsan | Summary'
}

export default function AccessoriesWrapLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className={styles.container}>{children}</div>
}
