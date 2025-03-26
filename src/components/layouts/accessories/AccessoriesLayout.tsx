import styles from './AccessoriesLayout.module.scss'

const AccessoriesLayout = ({ children }: { children: React.ReactNode }) => {
	return <main className={styles.container}>{children}</main>
}

export default AccessoriesLayout
