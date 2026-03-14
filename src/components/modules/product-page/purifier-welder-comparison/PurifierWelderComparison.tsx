'use client'

import { FC } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './PurifierWelderComparison.module.scss'
import { PurifierWelderComparisonData } from '@my-types/product'

interface PurifierWelderComparisonProps {
    data: PurifierWelderComparisonData
    className?: string
}

const PurifierWelderComparison: FC<PurifierWelderComparisonProps> = ({ data, className }) => {
    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.redText}>Comparison</span> of purifier and welder with purification
                </h2>
                {data.description && (
                    <Typography tag="p" size="s" weight="regular" className={styles.description}>
                        {data.description}
                    </Typography>
                )}
            </div>

            <div className={styles.comparisonGrid}>
                {data.cards.map((card, idx) => (
                    <div key={idx} className={styles.card}>
                        <div className={styles.iconWrapper}></div>
                        <Typography tag="h3" size="xl" weight="bold" className={styles.cardTitle}>
                            {card.title}
                        </Typography>
                        <div className={styles.specsList}>
                            {card.specs.map((spec, sIdx) => (
                                <div key={sIdx} className={styles.specRow}>
                                    <span className={styles.specLabel}>{spec.label}</span>
                                    <span className={styles.specValue}>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PurifierWelderComparison
