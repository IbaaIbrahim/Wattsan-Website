'use client'

import React, { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './TwoLaserHeads.module.scss'

interface TwoLaserHeadsProps {
    title: string
    subtitle: string
    description1: ReactNode
    description2: ReactNode
    image?: string
    className?: string
}

const TwoLaserHeads: FC<TwoLaserHeadsProps> = ({
    title,
    subtitle,
    description1,
    description2,
    image,
    className
}) => {
    return (
        <div className={clsx(styles.twoLaserHeads, className)}>
            <div className={styles.topSection}>
                {image && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            className={styles.image}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                        {subtitle}
                    </Typography>
                </div>

                <div className={styles.descriptions}>
                    <div className={styles.descriptionColumn}>
                        <Typography tag='p' size='s' weight='regular'>
                            {description1}
                        </Typography>
                    </div>
                    <div className={styles.descriptionColumn}>
                        <Typography tag='p' size='s' weight='regular'>
                            {description2}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TwoLaserHeads
