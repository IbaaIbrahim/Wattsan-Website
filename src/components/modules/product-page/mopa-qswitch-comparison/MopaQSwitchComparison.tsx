'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import styles from './MopaQSwitchComparison.module.scss'

export interface MopaComparisonCard {
    title: string
    image?: string
    specs: {
        label: string
        value: string
    }[]
}

export interface MopaQSwitchComparisonProps {
    title?: React.ReactNode
    description?: string
    cards: MopaComparisonCard[]
    className?: string
}

const MopaQSwitchComparison: FC<MopaQSwitchComparisonProps> = ({ title, description, cards, className }) => {
    if (!cards || cards.length === 0) return null

    return (
        <section className={clsx(styles.comparison, className)}>
            <div className={styles.leftCol}>
                <Typography tag='h2' size='xl' weight='bold' className={styles.title}>
                    {title || 'Comparison of MOPA and Q-SWITCH'}
                </Typography>
                {description && (
                    <Typography tag='p' size='s' weight='regular' className={styles.description}>
                        {description}
                    </Typography>
                )}
            </div>
            <div className={styles.rightCols}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            {card.image && <Image src={card.image} alt={card.title} fill style={{ objectFit: 'contain' }} />}
                            {!card.image && <div className={styles.placeholderIcon} />}
                        </div>
                        <Typography tag='h3' size='l' weight='semi-bold' className={styles.cardTitle}>
                            {card.title}
                        </Typography>
                        <div className={styles.specs}>
                            {card.specs.map((spec, i) => (
                                <div key={i} className={styles.spec}>
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

export default MopaQSwitchComparison
