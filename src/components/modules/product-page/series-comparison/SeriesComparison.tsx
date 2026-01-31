'use client'

import { FC, useRef } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './SeriesComparison.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'

export interface ComparisonSeries {
    id: string
    image: string
    title: string
    tagline: string
    price: string
    active?: boolean // Highlighted state (e.g. M1 series)
    specs: {
        workspace: string
        spindle: string
        motor: string
        control: string
        cooling: string
        sensorRemovable: string
        sensorBuiltIn: string
        lubrication: string
        aspiration: string
    }
}

interface SeriesComparisonProps {
    seriesData: ComparisonSeries[]
    className?: string
}

const SeriesComparison: FC<SeriesComparisonProps> = ({ seriesData, className }) => {
    const gridRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (gridRef.current) {
            const scrollAmount = 340 // Card width + gap
            gridRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.redText}>Series</span> comparison
                </h2>
                <div className={styles.controls}>
                    <button
                        className={clsx(styles.controlButton, styles.prevButton)}
                        onClick={() => scroll('left')}
                        aria-label="Previous series"
                    >
                        <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                    </button>
                    <button
                        className={clsx(styles.controlButton, styles.nextButton)}
                        onClick={() => scroll('right')}
                        aria-label="Next series"
                    >
                        <Image src={arrowIcon} alt="Next" width={24} height={24} />
                    </button>
                </div>
            </div>

            <div className={styles.comparisonGrid} ref={gridRef}>
                {seriesData.map((series) => (
                    <div
                        key={series.id}
                        className={clsx(styles.card, series.active && styles.active)}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={series.image}
                                    alt={series.title}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <Typography tag='h3' size='xl' weight='bold' className={styles.seriesTitle}>
                                {series.title}
                            </Typography>
                            <Typography tag='p' size='s' weight='regular' className={styles.tagline}>
                                {series.tagline}
                            </Typography>
                            <div className={styles.price}>
                                <span className={styles.from}>from</span>
                                <Typography tag='span' size='l' weight='bold'>
                                    {series.price}
                                </Typography>
                            </div>
                            {series.active && (
                                <button className={styles.learnMoreBtn}>
                                    Learn more
                                </button>
                            )}
                        </div>

                        <div className={styles.specsList}>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Workspace</span>
                                <span className={styles.specValue}>{series.specs.workspace}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Spindle</span>
                                <span className={styles.specValue}>{series.specs.spindle}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Motor</span>
                                <span className={styles.specValue}>{series.specs.motor}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Control system</span>
                                <span className={styles.specValue}>{series.specs.control}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Liquid cooling system</span>
                                <span className={clsx(styles.specValue, styles.highlight)}>{series.specs.cooling}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Removable instrument sensor</span>
                                <span className={clsx(styles.specValue, styles.highlight)}>{series.specs.sensorRemovable}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Built-in instrument sensor</span>
                                <span className={clsx(styles.specValue, styles.highlight)}>{series.specs.sensorBuiltIn}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Lubrication system</span>
                                <span className={clsx(styles.specValue, styles.highlight)}>{series.specs.lubrication}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specLabel}>Aspiration</span>
                                <span className={clsx(styles.specValue, styles.highlight)}>{series.specs.aspiration}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SeriesComparison
