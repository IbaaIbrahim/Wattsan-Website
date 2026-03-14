'use client'

import { FC } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './StitchesComparison.module.scss'
import { StitchesComparisonData } from '@my-types/product'

interface StitchesComparisonProps {
    data: StitchesComparisonData
    className?: string
}

const StitchesComparison: FC<StitchesComparisonProps> = ({ data, className }) => {
    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.redText}>Comparison</span> of stitches
                </h2>
            </div>

            <div className={styles.comparisonGrid}>
                {data.cards.map((card, idx) => (
                    <div key={idx} className={styles.card}>
                        <div className={styles.iconWrapper}></div>
                        <Typography tag="h3" size="xl" weight="bold" className={styles.cardTitle}>
                            {card.title}
                        </Typography>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default StitchesComparison
