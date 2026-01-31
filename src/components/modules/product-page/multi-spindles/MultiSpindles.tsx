'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './MultiSpindles.module.scss'

export interface MultiSpindlesSpec {
    title: string
    description: string
}

interface MultiSpindlesProps {
    title: string
    subtitle: string
    description1: ReactNode
    description2: ReactNode
    specs: MultiSpindlesSpec[]
    image?: string
    className?: string
}

const MultiSpindles: FC<MultiSpindlesProps> = ({
    title,
    subtitle,
    description1,
    description2,
    specs,
    image,
    className
}) => {
    return (
        <div className={clsx(styles.multiSpindles, className)}>
            <div className={styles.topSection}>
                {image && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image}
                            alt={title}
                            className={styles.image}
                            width={1400}
                            height={600}
                            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                        />
                    </div>
                )}
            </div>

            <div className={styles.middleSection}>
                <div className={styles.titleColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>
                    <Typography tag='h3' size='m' weight='bold' className={styles.subtitle}>
                        {subtitle}
                    </Typography>
                </div>

                <div className={styles.descriptionColumn}>
                    <div className={styles.descriptionItem}>
                        <Typography tag='p' size='s' weight='regular'>
                            {description1}
                        </Typography>
                    </div>
                    <div className={styles.descriptionItem}>
                        <Typography tag='p' size='s' weight='regular'>
                            {description2}
                        </Typography>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                {specs.map((spec, index) => (
                    <div key={index} className={styles.specItem}>
                        <div className={styles.specLine} />
                        <Typography tag='h4' size='m' weight='bold' className={styles.specTitle}>
                            {spec.title}
                        </Typography>
                        <Typography tag='p' size='s' weight='regular' className={styles.specDescription}>
                            {spec.description}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultiSpindles
