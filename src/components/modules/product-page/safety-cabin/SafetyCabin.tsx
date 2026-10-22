'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './SafetyCabin.module.scss'
import { hasHighlightMarkers, renderHighlightedTitle } from '@/utils/highlight-title'

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

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Safety</span> cabin
            </>
        )
    }
    if (hasHighlightMarkers(titleNode)) return renderHighlightedTitle(titleNode, styles.redHighlight)
    if (typeof titleNode !== 'string') return titleNode
    if (titleNode.includes('<span')) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }
    const match = titleNode.match(/^(safety)(.*)$/i)
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

const SafetyCabin: FC<SafetyCabinProps> = ({
    title,
    description,
    features = [],
    image,
    className
}) => {
    return (
        <section className={clsx(styles.safetyCabin, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderTitle(title)}
                    </Typography>

                    <div className={styles.description}>
                        {typeof description === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            description
                        )}
                    </div>

                    {features.length > 0 && (
                        <div className={styles.features}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <Typography tag='h3' className={styles.featureTitle}>
                                        {feature.title}
                                    </Typography>
                                    <div className={styles.featureDescription}>
                                        {typeof feature.description === 'string' && feature.description.includes('<') ? (
                                            <div dangerouslySetInnerHTML={{ __html: feature.description }} />
                                        ) : (
                                            <Typography tag='p' className={styles.featureDescriptionText}>
                                                {feature.description}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        {image && (
                            <Image
                                src={image}
                                alt="Safety Cabin"
                                width={620}
                                height={534}
                                className={styles.image}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SafetyCabin
