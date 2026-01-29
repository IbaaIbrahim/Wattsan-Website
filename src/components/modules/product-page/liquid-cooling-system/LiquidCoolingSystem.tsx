'use client'

import { FC, ReactNode } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './LiquidCoolingSystem.module.scss'

export interface LiquidCoolingType {
    title: string
    description: string
    media?: string // Optional for later
}

interface LiquidCoolingSystemProps {
    title: ReactNode
    subtitle: string
    description: ReactNode
    types: LiquidCoolingType[]
    className?: string
}

const LiquidCoolingSystem: FC<LiquidCoolingSystemProps> = ({
    title,
    subtitle,
    description,
    types,
    className
}) => {
    return (
        <section className={clsx(styles.liquidCooling, className)}>
            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                        {subtitle}
                    </Typography>
                    <div className={styles.description}>
                        {description}
                    </div>
                </div>

                <div className={styles.typesList}>
                    {types.map((type, index) => (
                        <div key={index} className={styles.typeCard}>
                            <div className={styles.mediaPlaceholder}>
                                <div className={styles.playIcon}>
                                    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M43.0417 30.5L22.9167 43.1026L22.9167 17.8974L43.0417 30.5Z" fill="#D1D1D1" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.typeContent}>
                                <Typography tag='h3' size='l' weight='bold' className={styles.typeTitle}>
                                    {type.title}
                                </Typography>
                                <Typography tag='p' size='s' weight='regular' className={styles.typeDescription}>
                                    {type.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LiquidCoolingSystem
