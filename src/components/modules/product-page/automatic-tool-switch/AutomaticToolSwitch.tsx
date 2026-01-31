'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './AutomaticToolSwitch.module.scss'

export interface ToolSwitchVariant {
    id: string
    title: string
    description: string
    thumbnail: string
    videoUrl?: string
    footerLabel?: string
    isWarning?: boolean
}

interface AutomaticToolSwitchProps {
    title?: ReactNode
    subtitle?: string
    description?: ReactNode
    image?: string
    subHeading?: ReactNode
    subDescription?: ReactNode
    variants: ToolSwitchVariant[]
    className?: string
}

const AutomaticToolSwitch: FC<AutomaticToolSwitchProps> = ({
    title,
    subtitle,
    description,
    image,
    subHeading,
    subDescription,
    variants,
    className
}) => {
    return (
        <section className={clsx(styles.automaticToolSwitch, className)}>
            <div className={styles.topSection}>
                <div className={styles.textColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                            {subtitle}
                        </Typography>
                    )}

                    <div className={styles.description}>
                        {description}
                    </div>

                    {subHeading && (
                        <Typography tag='h3' size='xl' weight='bold' className={styles.subHeading}>
                            {subHeading}
                        </Typography>
                    )}

                    {subDescription && (
                        <div className={styles.subDescription}>
                            {subDescription}
                        </div>
                    )}
                </div>

                <div className={styles.imageColumn}>
                    {image && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={image}
                                alt="Automatic Tool Switch"
                                width={800}
                                height={500}
                                className={styles.image}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.variantsGrid}>
                {variants.map((variant) => (
                    <div key={variant.id} className={styles.variantCard}>
                        <div className={styles.thumbnailWrapper}>
                            <div className={styles.placeholderThumbnail}>
                                <div className={styles.playButton}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cardContent}>
                            <Typography tag='h4' size='m' weight='bold' className={styles.variantTitle}>
                                {variant.title}
                            </Typography>

                            <Typography tag='p' size='s' weight='regular' className={styles.variantDescription}>
                                {variant.description}
                            </Typography>

                            {variant.footerLabel && (
                                <Typography
                                    tag='p'
                                    size='xs'
                                    weight='regular'
                                    className={clsx(styles.footerLabel, variant.isWarning && styles.warning)}
                                >
                                    {variant.footerLabel}
                                </Typography>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AutomaticToolSwitch
