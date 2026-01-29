'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './SeparateRotaryDevice.module.scss'

interface SeparateRotaryDeviceProps {
    title: ReactNode
    description: ReactNode
    featuresTitle?: string
    features: ReactNode[]
    image: string
    className?: string
}

const SeparateRotaryDevice: FC<SeparateRotaryDeviceProps> = ({
    title,
    description,
    featuresTitle,
    features,
    image,
    className
}) => {
    return (
        <div className={clsx(styles.separateRotaryDevice, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Typography tag='h2' weight='bold' className={styles.title}>
                        {title}
                    </Typography>

                    <div className={styles.description}>
                        {description}
                    </div>

                    {featuresTitle && (
                        <Typography tag='h3' weight='bold' className={styles.featuresTitle}>
                            {featuresTitle}
                        </Typography>
                    )}

                    <div className={styles.features}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <Typography tag='p' size='s' weight='regular' className={styles.featureText}>
                                    {feature}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt="Separate Rotary Device"
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

export default SeparateRotaryDevice
