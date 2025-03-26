import styles from './GridWrapper.module.scss'

export default function GridWrapper({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className={styles.wrapper}>{children}</div>
}
