'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import styles from './LaserTypes.module.scss'

export interface LaserTypeCard {
    id: string
    title: string
    image: string
    specs: {
        label: string
        value: string
    }[]
}

export interface LaserTypesProps {
    title?: React.ReactNode
    cards: LaserTypeCard[]
    className?: string
}

const LaserTypes: FC<LaserTypesProps> = ({ title, cards, className }) => {
    if (!cards || cards.length === 0) return null

    return (
        <section className={clsx(styles.laserTypes, className)}>
            <div className={styles.titleWrapper}>
                <Typography tag='h2' size='xl' weight='bold' className={styles.title}>
                    {title || 'Laser types'}
                </Typography>
            </div>
            <div className={styles.grid}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <Typography tag='h3' size='l' weight='semi-bold' className={styles.cardTitle}>
                            {card.title}
                        </Typography>
                        <div className={styles.specs}>
                            {card.specs.map((spec, index) => (
                                <div key={index} className={styles.spec}>
                                    <Typography tag='span' size='xs' weight='regular' className={styles.label}>
                                        {spec.label}
                                    </Typography>
                                    <Typography tag='span' size='s' weight='regular' className={styles.value}>
                                        {spec.value}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LaserTypes
