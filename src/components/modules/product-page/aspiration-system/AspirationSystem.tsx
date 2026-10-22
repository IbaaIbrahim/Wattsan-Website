'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './AspirationSystem.module.scss'

export interface AspirationSystemProps {
    title?: ReactNode
    subtitle?: string
    description?: ReactNode
    videoUrl?: string
    image?: string
    thumbnail?: string
    className?: string
}

const DEFAULT_TITLE = 'Aspiration System'
const DEFAULT_SUBTITLE = 'All models supported'
const DEFAULT_DESCRIPTION =
    'Aspiration systems are designed to efficiently remove dust, chips, and debris created during machining. This improves air quality in the workspace, ensures a cleaner environment, and reduces the risk of tool wear and clogging. It also helps maintain precision and prolongs the machine\'s lifespan.\nAirflow rate, filter capacity, and suction efficiency affect dust removal, tool longevity, and workspace cleanliness, ensuring optimal machine performance and safety.'

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Aspiration</span> System
            </>
        )
    }

    if (typeof titleNode !== 'string') {
        return titleNode
    }

    if (
        titleNode.includes('<span') ||
        titleNode.includes('<b') ||
        titleNode.includes('<strong')
    ) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }

    const match = titleNode.match(/^(aspiration)(.*)$/i)
    if (match) {
        return (
            <>
                <span className={styles.redHighlight}>{match[1]}</span>
                {match[2]}
            </>
        )
    }

    return titleNode
}

const renderDescription = (descNode?: ReactNode) => {
    if (!descNode) return null

    if (typeof descNode !== 'string') {
        return descNode
    }

    if (
        descNode.includes('<p') ||
        descNode.includes('<br') ||
        descNode.includes('<div') ||
        descNode.includes('<span')
    ) {
        return <div dangerouslySetInnerHTML={{ __html: descNode }} />
    }

    if (descNode.includes('\n')) {
        return (
            <>
                {descNode
                    .split('\n')
                    .filter(Boolean)
                    .map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
            </>
        )
    }

    return <p>{descNode}</p>
}

const AspirationSystem: FC<AspirationSystemProps> = ({
    title,
    subtitle = DEFAULT_SUBTITLE,
    description = DEFAULT_DESCRIPTION,
    videoUrl,
    image,
    thumbnail,
    className
}) => {
    const finalTitle = title || DEFAULT_TITLE
    const finalSubtitle = subtitle || DEFAULT_SUBTITLE
    const finalDescription = description || DEFAULT_DESCRIPTION
    const mediaImage = image || thumbnail

    return (
        <section className={clsx(styles.aspirationSystem, className)}>
            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderTitle(finalTitle)}
                    </Typography>
                    {finalSubtitle && (
                        <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                            {finalSubtitle}
                        </Typography>
                    )}
                    <div className={styles.description}>
                        {renderDescription(finalDescription)}
                    </div>
                </div>

                <div className={styles.mediaWrapper}>
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            controls
                            poster={mediaImage}
                            className={styles.video}
                        />
                    ) : mediaImage ? (
                        <div className={styles.thumbnailImageWrapper}>
                            <Image
                                src={mediaImage}
                                alt="Aspiration System"
                                fill
                                className={styles.thumbnailImage}
                            />
                            <div className={styles.playOverlay}>
                                <div className={styles.playIcon}>
                                    <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28.5 16.4551L0 32.9096L0 0.0006L28.5 16.4551Z" fill="#D9D9D9" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.playIcon}>
                            <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.5 16.4551L0 32.9096L0 0.0006L28.5 16.4551Z" fill="#D9D9D9" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AspirationSystem
