'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './SeparateRotaryDevice.module.scss'

export interface SeparateRotaryDeviceProps {
    title?: ReactNode
    description?: ReactNode
    featuresTitle?: string
    features?: ReactNode[]
    image?: string
    className?: string
}

const DEFAULT_TITLE = 'Separate rotary device'
const DEFAULT_DESCRIPTION =
    'Expand the capabilities of your Wattsan CNC router with a standalone rotary device designed for precise 4-axis machining of cylindrical and complex parts. This add-on is ideal for woodworking, engraving, and 3D shaping tasks that require rotation along the A-axis. \nUp to 4 rotary devices can be installed on the M1 S model.'
const DEFAULT_FEATURES_TITLE = 'Key Features'
const DEFAULT_FEATURES: string[] = [
    'Available with processing lengths from 600 to 3000 mm',
    'Maximum Z-axis height is up to 300 mm',
    'Compatible exclusively with the DSP A18 controller',
    'Robust construction for high-precision rotation and stability'
]
const DEFAULT_IMAGE = '/product-cards/cnc-router/rd-rotary/separate-rotary-device.svg'

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Separate</span> rotary device
            </>
        )
    }

    if (typeof titleNode !== 'string') {
        return titleNode
    }

    if (titleNode.includes('<span') || titleNode.includes('<b') || titleNode.includes('<strong')) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }

    const match = titleNode.match(/^(separate)(.*)$/i)
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

const SeparateRotaryDevice: FC<SeparateRotaryDeviceProps> = ({
    title,
    description = DEFAULT_DESCRIPTION,
    featuresTitle = DEFAULT_FEATURES_TITLE,
    features = DEFAULT_FEATURES,
    image = DEFAULT_IMAGE,
    className
}) => {
    const finalFeatures = features && features.length > 0 ? features : DEFAULT_FEATURES
    const finalDescription = description || DEFAULT_DESCRIPTION
    const finalFeaturesTitle = featuresTitle || DEFAULT_FEATURES_TITLE
    const finalImage =
        image && image !== '/product-cards/cnc-router/rd-rotary/rd-r-1.png'
            ? image
            : DEFAULT_IMAGE

    return (
        <section className={clsx(styles.separateRotaryDevice, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderTitle(title)}
                    </Typography>

                    <div className={styles.description}>
                        {typeof finalDescription === 'string' ? (
                            finalDescription.includes('<p') ||
                            finalDescription.includes('<br') ||
                            finalDescription.includes('<div') ? (
                                <div dangerouslySetInnerHTML={{ __html: finalDescription }} />
                            ) : (
                                finalDescription
                                    .split('\n')
                                    .filter(Boolean)
                                    .map((para, index) => <p key={index}>{para}</p>)
                            )
                        ) : (
                            finalDescription
                        )}
                    </div>

                    {finalFeaturesTitle && (
                        <Typography tag='h3' className={styles.featuresTitle}>
                            {finalFeaturesTitle}
                        </Typography>
                    )}

                    {finalFeatures.length > 0 && (
                        <div className={styles.features}>
                            {finalFeatures.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    {typeof feature === 'string' &&
                                    (feature.includes('<') || feature.includes('&')) ? (
                                        <div
                                            className={styles.featureText}
                                            dangerouslySetInnerHTML={{ __html: feature }}
                                        />
                                    ) : (
                                        <Typography
                                            tag='p'
                                            size='s'
                                            weight='regular'
                                            className={styles.featureText}
                                        >
                                            {feature}
                                        </Typography>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={finalImage}
                            alt="Separate Rotary Device"
                            width={1063}
                            height={499}
                            className={styles.image}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeparateRotaryDevice
