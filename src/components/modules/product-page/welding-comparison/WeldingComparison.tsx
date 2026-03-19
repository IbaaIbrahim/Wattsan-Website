'use client'

import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './WeldingComparison.module.scss'
import { WeldingComparisonData } from '@my-types/product'

interface WeldingComparisonProps {
    data: WeldingComparisonData
    className?: string
}

const WeldingComparison: FC<WeldingComparisonProps> = ({ data, className }) => {
    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.redText}>Welding</span> comparison
                </h2>
            </div>

            <div className={styles.comparisonTable}>
                <div className={styles.featuresColumn}>
                    <div className={styles.columnHeader}></div>
                    <div className={styles.divider}></div>
                    {data.features.map((feature, idx) => (
                        <div key={idx} className={styles.featureRow}>
                            <p className={styles.featureText}>{feature}</p>
                            <div className={styles.rowDivider}></div>
                        </div>
                    ))}
                </div>

                {data.columns.map((column, colIdx) => (
                    <div key={colIdx} className={styles.dataColumn}>
                        <div className={styles.columnHeader}>
                            <span className={styles.columnTitle}>{column.title}</span>
                        </div>
                        <div className={styles.divider}></div>
                        {column.checks.map((check, checkIdx) => (
                            <div key={checkIdx} className={styles.checkRow}>
                                <div className={styles.checkWrapper}>
                                    {check.hasCheck ? (
                                        <Image
                                            src={check.icon || '/img/icons/check.svg'}
                                            alt="Check"
                                            width={24}
                                            height={24}
                                            className={styles.checkIcon}
                                        />
                                    ) : (
                                        <span className={styles.dash}>—</span>
                                    )}
                                </div>
                                <div className={styles.rowDivider}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WeldingComparison
