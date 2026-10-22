'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './LiquidCoolingSystem.module.scss'
import { hasHighlightMarkers, renderHighlightedTitle } from '@/utils/highlight-title'

export interface LiquidCoolingType {
    title: string
    description: string
    videoUrl?: string
    media?: string
    image?: string
    thumbnail?: string
}

interface LiquidCoolingSystemProps {
    title?: ReactNode
    subtitle?: string
    description?: ReactNode
    types?: LiquidCoolingType[]
    className?: string
}

const DEFAULT_TITLE = 'Liquid cooling system'
const DEFAULT_SUBTITLE = 'All models supported'
const DEFAULT_DESCRIPTION =
    'While milling some materials, especially metals, a lot of heat is being formed. This can damage the instrument, the workpiece itself, or the CNC router. And that\'s why the cutting fluid system exists—to prevent that from happening. With it, you can process aluminum, copper, brass, acrylic, etc.\nThe cutting fluid system minimizes the friction between the milling bit and the material. This increases the machining quality and slows down the wear-out process of the instrument 10 times. Additionally, the system removes chips from the working area and eliminates the possibility of corrosion appearance.'

const DEFAULT_TYPES: LiquidCoolingType[] = [
    {
        title: 'Oil-mist spray system',
        description:
            'Here, the liquid is sprayed to the working area. The liquids themselves are more viscous and can sustain greater temperatures. This system can be installed on any Wattsan CNC machine.'
    },
    {
        title: 'Flood type',
        description:
            'Here, a jet of pressured water is being delivered, and this system requires a modificated router bed. Water as coolant has a good price-quality ratio and is easily accessible.'
    }
]

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Liquid</span> cooling system
            </>
        )
    }

    if (hasHighlightMarkers(titleNode)) return renderHighlightedTitle(titleNode, styles.redHighlight)
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

    const match = titleNode.match(/^(liquid)(.*)$/i)
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

const LiquidCoolingSystem: FC<LiquidCoolingSystemProps> = ({
    title,
    subtitle = DEFAULT_SUBTITLE,
    description = DEFAULT_DESCRIPTION,
    types,
    className
}) => {
    const finalTitle = title || DEFAULT_TITLE
    const finalSubtitle = subtitle || DEFAULT_SUBTITLE
    const finalDescription = description || DEFAULT_DESCRIPTION
    // This section contains only 2 repeatables, no more
    const finalTypes = (types && types.length > 0 ? types : DEFAULT_TYPES).slice(0, 2)

    return (
        <section className={clsx(styles.liquidCooling, className)}>
            <div className={styles.grid}>
                <div className={styles.mainInfo}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderTitle(finalTitle)}
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                        {finalSubtitle}
                    </Typography>
                    <div className={styles.description}>
                        {renderDescription(finalDescription)}
                    </div>
                </div>

                <div className={styles.typesList}>
                    {finalTypes.map((type, index) => {
                        const videoSrc = type.videoUrl || type.media
                        const imageSrc = type.thumbnail || type.image

                        return (
                            <div key={index} className={styles.typeCard}>
                                <div className={styles.mediaPlaceholder}>
                                    {videoSrc ? (
                                        <video
                                            src={videoSrc}
                                            controls
                                            className={styles.video}
                                        />
                                    ) : imageSrc ? (
                                        <div className={styles.thumbnailImageWrapper}>
                                            <Image
                                                src={imageSrc}
                                                alt={type.title}
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
                                <div className={styles.typeContent}>
                                    <Typography tag='h3' size='l' weight='bold' className={styles.typeTitle}>
                                        {type.title}
                                    </Typography>
                                    <div className={styles.typeDescription}>
                                        {renderDescription(type.description)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default LiquidCoolingSystem
