'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './RotaryDevice.module.scss'

export interface RotaryDeviceSpec {
    value: string
    label: string
}

interface RotaryDeviceProps {
    subtitle?: string
    title: ReactNode
    description: ReactNode
    specs: RotaryDeviceSpec[]
    image: string
    className?: string
}

const RotaryDevice: FC<RotaryDeviceProps> = ({
    subtitle,
    title,
    description,
    specs,
    image,
    className
}) => {
    return (
        <div className={clsx(styles.rotaryDevice, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    {subtitle && (
                        <Typography tag='span' size='s' weight='bold' className={styles.subtitle}>
                            {subtitle}
                        </Typography>
                    )}

                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>

                    <div className={styles.description}>
                        {description}
                    </div>

                    <div className={styles.specs}>
                        {specs.map((spec, index) => (
                            <div key={index} className={styles.specItem}>
                                <Typography tag='h3' size='xl' weight='bold' className={styles.specValue}>
                                    {spec.value}
                                </Typography>
                                <Typography tag='p' size='s' weight='regular' className={styles.specLabel}>
                                    {spec.label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt="Rotary Device Illustration"
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

export default RotaryDevice
