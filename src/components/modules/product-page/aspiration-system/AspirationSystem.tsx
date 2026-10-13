'use client'

import { FC, ReactNode } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './AspirationSystem.module.scss'

interface AspirationSystemProps {
    title: ReactNode
    subtitle: string
    description: ReactNode
    videoUrl?: string
    className?: string
}

const AspirationSystem: FC<AspirationSystemProps> = ({
    title,
    subtitle,
    description,
    videoUrl,
    className
}) => {
    return (
        <section className={clsx(styles.aspirationSystem, className)}>
            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {title}
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                        {subtitle}
                    </Typography>
                    <div className={styles.description}>
                        {typeof description === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            description
                        )}
                    </div>
                </div>

                <div className={styles.mediaWrapper}>
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className={styles.playIcon}>
                            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.0417 30.5L22.9167 43.1026L22.9167 17.8974L43.0417 30.5Z" fill="#D1D1D1" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AspirationSystem

