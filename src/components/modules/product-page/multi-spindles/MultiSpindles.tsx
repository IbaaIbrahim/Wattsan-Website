'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './MultiSpindles.module.scss'
import { hasHighlightMarkers, renderHighlightedTitle } from '@/utils/highlight-title'

export interface MultiSpindlesSpec {
    title: string
    description: string
}

export interface MultiSpindlesProps {
    title?: ReactNode
    subtitle?: ReactNode
    description1?: ReactNode
    description2?: ReactNode
    specs?: MultiSpindlesSpec[]
    image?: string
    className?: string
}

const DEFAULT_TITLE = '4 spindles'
const DEFAULT_SUBTITLE = 'x4 productivity'
const DEFAULT_DESCRIPTION1 =
    'Wattsan milling machines with 4 synchronized spindles increase productivity by 4 times while maintaining high accuracy and repeatability. This saves changeover time, reduces personnel and equipment costs, and optimizes shop floor space utilization.'
const DEFAULT_DESCRIPTION2 =
    'Wattsan provides equipment matching clients manufacturing needs, due to which a CNC router machine can have a singular spindle or multiple. This parameter defines speed and production volume. For example, with several spindles, you can simultaneously make 4 balusters.'
const DEFAULT_SPECS: MultiSpindlesSpec[] = [
    {
        title: 'Spindles quantity',
        description:
            'A machine can only have a certain number of spindles installed (up to 4 pcs). It is determined by the diameter of the spindles and the length of the X-axis.'
    },
    {
        title: 'X-axis length',
        description:
            'This is an axis that runs parallel to the gantry. Its length determines the max amount of spindles. On Wattsan machines, the max quantity is four.'
    },
    {
        title: 'Spindle diameter',
        description: 'It can be 80, 100, or 125 mm.'
    }
]
const DEFAULT_IMAGE = '/product-cards/cnc-router/spindles/spindles-4.svg'

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return DEFAULT_TITLE
    }

    if (hasHighlightMarkers(titleNode)) return renderHighlightedTitle(titleNode, styles.redHighlight)
    if (typeof titleNode !== 'string') {
        return titleNode
    }

    if (titleNode.includes('<span') || titleNode.includes('<b') || titleNode.includes('<strong')) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }

    return titleNode
}

const renderText = (textNode?: ReactNode) => {
    if (!textNode) return null

    if (typeof textNode !== 'string') {
        return textNode
    }

    if (
        textNode.includes('<p') ||
        textNode.includes('<br') ||
        textNode.includes('<div') ||
        textNode.includes('<span') ||
        textNode.includes('<b') ||
        textNode.includes('<strong')
    ) {
        return <div dangerouslySetInnerHTML={{ __html: textNode }} />
    }

    if (textNode.includes('\n')) {
        return (
            <>
                {textNode
                    .split('\n')
                    .filter(Boolean)
                    .map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
            </>
        )
    }

    return <p>{textNode}</p>
}

const MultiSpindles: FC<MultiSpindlesProps> = ({
    title = DEFAULT_TITLE,
    subtitle = DEFAULT_SUBTITLE,
    description1 = DEFAULT_DESCRIPTION1,
    description2 = DEFAULT_DESCRIPTION2,
    specs = DEFAULT_SPECS,
    image = DEFAULT_IMAGE,
    className
}) => {
    const finalSpecs = specs && specs.length > 0 ? specs : DEFAULT_SPECS
    const finalDescription1 = description1 || DEFAULT_DESCRIPTION1
    const finalDescription2 = description2 !== undefined ? description2 : DEFAULT_DESCRIPTION2
    const finalImage =
        image && image !== '/product-cards/cnc-router/spindles/spindles-4.png'
            ? image
            : DEFAULT_IMAGE

    return (
        <section className={clsx(styles.multiSpindles, className)}>
            {finalImage && (
                <div className={styles.topSection}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={finalImage}
                            alt={typeof title === 'string' ? title : '4 spindles'}
                            className={styles.image}
                            width={1840}
                            height={400}
                            priority
                        />
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                    {renderTitle(title)}
                </Typography>

                <div className={clsx(styles.columns, finalSpecs.length === 0 && styles.noSpecs)}>
                    {/* Left Column: Subtitle + Divider Line + Description Grid */}
                    <div className={styles.leftColumn}>
                        {subtitle && (
                            <Typography tag='h3' className={styles.subtitle}>
                                {subtitle}
                            </Typography>
                        )}
                        <div className={styles.dividerLine} />
                        <div
                            className={clsx(
                                styles.descriptionGrid,
                                !finalDescription2 && styles.singleDescription
                            )}
                        >
                            <div className={styles.descriptionItem}>
                                {renderText(finalDescription1)}
                            </div>
                            {finalDescription2 && (
                                <div className={styles.descriptionItem}>
                                    {renderText(finalDescription2)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Spec Items */}
                    {finalSpecs.length > 0 && (
                        <div className={styles.rightColumn}>
                            {finalSpecs.map((spec, index) => (
                                <div key={index} className={styles.specItem}>
                                    <Typography tag='h4' className={styles.specTitle}>
                                        {spec.title}
                                    </Typography>
                                    <div className={styles.dividerLine} />
                                    <div className={styles.specDescription}>
                                        {renderText(spec.description)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MultiSpindles
