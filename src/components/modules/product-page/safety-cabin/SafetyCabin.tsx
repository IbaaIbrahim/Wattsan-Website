'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './SafetyCabin.module.scss'

export interface SafetyCabinFeature {
    title: string
    description: string
}

interface SafetyCabinProps {
    title: ReactNode
    description: ReactNode
    features: SafetyCabinFeature[]
    image: string
    className?: string
}

const SafetyCabin: FC<SafetyCabinProps> = ({
    title,
    description,
    features,
    image,
    className
}) => {
    return (
        <div className={clsx(styles.safetyCabin, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>

                    <div className={styles.description}>
                        {description}
                    </div>

                    <div className={styles.features}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <div className={styles.featureTitle}>
                                    <Typography tag='h4' size='m' weight='bold'>
                                        {feature.title}
                                    </Typography>
                                </div>
                                <Typography tag='p' size='s' weight='regular' className={styles.featureDescription}>
                                    {feature.description}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt="Safety Cabin"
                            width={800}
                            height={600}
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafetyCabin
