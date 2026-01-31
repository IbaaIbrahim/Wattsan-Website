'use client'

import { FC } from 'react'
import PopularItem from '@components/modules/basket/popular-item/PopularItem'
import { TPopularItem } from '@my-types/basket'
import styles from './InterestedProducts.module.scss'

interface InterestedProductsProps {
    className?: string
    products?: TPopularItem[]
}

const InterestedProducts: FC<InterestedProductsProps> = ({ className, products: initialProducts }) => {
    // Sample data based on the design
    const defaultProducts: TPopularItem[] = [
        {
            id: '1',
            image: '/img/catalog/cnc-routes.png', // Placeholder
            name: 'Accessories for CNC Router Machines',
            code: 'Spindle SDK GDZ120x103-4.5',
            modification: '',
            price: '5000'
        },
        {
            id: '2',
            image: '/img/catalog/cnc-routes.png', // Placeholder
            name: 'Laser Cutting Engraving Machine',
            code: '6040 ST',
            modification: 'modified',
            price: '5000'
        },
        {
            id: '3',
            image: '/img/catalog/cnc-routes.png', // Placeholder
            name: 'Accessories for CNC Router Machines',
            code: 'Spindle SDK GDZ120x103-4.5',
            modification: '',
            price: '5000'
        },
        {
            id: '4',
            image: '/img/catalog/cnc-routes.png', // Placeholder
            name: 'Laser Cutting Engraving Machine',
            code: '6040 ST',
            modification: 'modified',
            price: '5000'
        }
    ]

    const displayProducts = initialProducts || defaultProducts

    return (
        <section className={`${styles.section} ${className || ''}`}>
            <h2 className={styles.title}>
                You might be <span className={styles.titleHighlight}>interested</span>
            </h2>
            <div className={styles.grid}>
                {displayProducts.map((item) => (
                    <PopularItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default InterestedProducts
