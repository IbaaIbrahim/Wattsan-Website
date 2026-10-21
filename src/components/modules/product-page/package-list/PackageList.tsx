import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './PackageList.module.scss'

import { PackageItem } from '@my-types/product'

interface PackageListProps {
    items?: PackageItem[]
    className?: string
}

const PackageList: FC<PackageListProps> = ({ items = [], className }) => {
    if (!items || items.length === 0) {
        return null
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.redText}>Package</span> list
                    </h2>
                </div>

                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div key={item.id || index} className={styles.item}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.image || '/img/catalog/cnc-routes.png'}
                                    alt={item.label || 'Package item'}
                                    width={135}
                                    height={158}
                                    className={styles.image}
                                />
                            </div>
                            <p className={styles.label}>
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PackageList
