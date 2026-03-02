'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import styles from './MopaQSwitchGrid.module.scss'

export interface MopaComparisonCard {
    title: string
    image?: string
    specs: {
        label: string
        value: string
    }[]
}

export interface MopaQSwitchGridProps {
    title?: ReactNode
    description?: string
    cards: MopaComparisonCard[]
    alert?: {
        text: string
        icon?: string
    }
    className?: string
}

const MopaQSwitchGrid: FC<MopaQSwitchGridProps> = ({ title, description, cards, alert, className }) => {
    if (!cards || cards.length < 2) return null

    return (
        <section className={clsx(styles.gridSection, className)}>
            <Typography tag='h2' size='xl' weight='bold' className={styles.sectionTitle}>
                {title || 'Comparison of MOPA and Q-SWITCH'}
            </Typography>
            <div className={styles.grid}>
                {/* Cards for MOPA and Q-SWITCH */}
                {cards.slice(0, 2).map((card, index) => (
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

                {/* Description column */}
                <div className={styles.infoCol}>
                    <div className={styles.infoColContent}>
                        {description && (
                            <Typography tag='p' size='l' weight='semi-bold' className={styles.bigDescription}>
                                {description}
                            </Typography>
                        )}
                        {alert && (
                            <div className={styles.alert}>
                                <div className={styles.alertIcon}>
                                    <span>!</span>
                                </div>
                                <Typography tag='p' size='xs' weight='semi-bold' className={styles.alertText}>
                                    {alert.text}
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MopaQSwitchGrid
