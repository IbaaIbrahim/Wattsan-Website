import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Typography } from '@components/ui/typography/Typography'
import styles from './PackageList.module.scss'

export interface PackageItem {
    id: string
    image: string
    label: string
}

interface PackageListProps {
    items?: PackageItem[]
    className?: string
}

const PackageList: FC<PackageListProps> = ({ items = [], className }) => {
    const defaultItems: PackageItem[] = [
        { id: '2', image: '/img/catalog/cnc-routes.png', label: 'Package list - 2' },
        { id: '3', image: '/img/catalog/cnc-routes.png', label: 'Package list - 3' },
        { id: '4', image: '/img/catalog/cnc-routes.png', label: 'Package list - 4' },
        { id: '5', image: '/img/catalog/cnc-routes.png', label: 'Package list - 5' },
        { id: '6', image: '/img/catalog/cnc-routes.png', label: 'Package list - 6' },
        { id: '7', image: '/img/catalog/cnc-routes.png', label: 'Package list - 7' },
        { id: '8', image: '/img/catalog/cnc-routes.png', label: 'Package list - 8' },
        { id: '8-2', image: '/img/catalog/cnc-routes.png', label: 'Package list - 8' },
        { id: '9', image: '/img/catalog/cnc-routes.png', label: 'Package list - 9' },
        { id: '10', image: '/img/catalog/cnc-routes.png', label: 'Package list - 10' },
        { id: '11', image: '/img/catalog/cnc-routes.png', label: 'Package list - 11' },
        { id: '12', image: '/img/catalog/cnc-routes.png', label: 'Package list - 12' },
        { id: '13', image: '/img/catalog/cnc-routes.png', label: 'Package list - 13' },
    ]

    const displayItems = items.length > 0 ? items : defaultItems

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
