import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Typography } from '@components/ui/typography/Typography'
import styles from './PackageList.module.scss'

import { PackageItem } from '@my-types/product'

interface PackageListProps {
    items: PackageItem[]
    className?: string
}

const PackageList: FC<PackageListProps> = ({ items = [], className }) => {
    const displayItems = items

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <Typography tag='h2' size='xl' weight='semi-bold' className={styles.title}>
                    <span className={styles.redText}>Package</span> list
                </Typography>

                <div className={styles.grid}>
                    {displayItems.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.image}
                                    alt={item.label}
                                    width={120}
                                    height={120}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <Typography tag='p' size='s' weight='semi-bold' className={styles.label}>
                                {item.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PackageList
