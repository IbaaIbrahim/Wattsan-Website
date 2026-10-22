'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './AutomaticToolSwitch.module.scss'

export interface ToolSwitchVariant {
    id: string
    title: string
    description: string
    thumbnail?: string
    video?: string
    videoUrl?: string
    footerLabel?: string
    warning?: string
    isWarning?: boolean
}

interface AutomaticToolSwitchProps {
    title?: ReactNode
    subtitle?: string
    description?: ReactNode
    image?: string
    subHeading?: ReactNode
    subDescription?: ReactNode
    variants?: ToolSwitchVariant[]
    className?: string
}

const DEFAULT_TITLE = 'Automatic tool switch'
const DEFAULT_SUBTITLE = 'Requires no intervention during operation'
const DEFAULT_DESCRIPTION =
    'The Wattsan M1 6090 features a 2.2 kW spindle as standard. The machine is designed with a safety margin to accommodate higher power.\nThe automatic tool change system is available only for M3 models, and it speeds up the production 4-5 times and may come with a variety of instruments. This system provides precise and solid installation of the end mills.\nThe amount of available tools defines the variability and complexity of layouts that may be processed in one go without human interference. Otherwise, the workflow has to be stopped to change the tools in the system.'
const DEFAULT_SUBHEADING = 'Accelerates work up to x8 times'
const DEFAULT_SUBDESCRIPTION =
    'The Wattsan M1 6090 features a 2.2 kW spindle as standard. The machine is designed with a safety margin to accommodate higher power.'
const DEFAULT_IMAGE = '/product-cards/cnc-router/automatic-tool-switch/illustration.svg'

const DEFAULT_VARIANTS: ToolSwitchVariant[] = [
    {
        id: '4-6-tools',
        title: '4 and 6 tools',
        description:
            'These two options are available for any M3 model. This is the lowest amount of tools, though it may be enough, if your production process is strictly defined.',
        footerLabel: 'All models supported',
        isWarning: false
    },
    {
        id: '8-tools',
        title: '8 tools',
        description:
            "Eight tools is a medium number of instruments that is good for the majority of operations. It's a standard option for 1313 and 1325 Wattsan CNC machines.",
        footerLabel: 'All models supported',
        isWarning: false
    },
    {
        id: '10-tools',
        title: '10 tools',
        description: 'This is a basic configuration for the M3 1616 Wattsan machine.',
        footerLabel: 'Not available for smaller models.',
        isWarning: true
    },
    {
        id: '12-tools',
        title: '12 tools',
        description:
            'This is the standard setup for large industrial Wattsan CNC machines such as 2030, 2040, and 2060.\nDue to the purposes, they must contain a large number of instruments to create complicated designs at rapid speeds.',
        footerLabel: 'Twelve tools cannot be installed on the 1313, 1325, and 1616 models.',
        isWarning: true
    }
]

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Automatic</span> tool switch
            </>
        )
    }

    if (typeof titleNode !== 'string') {
        return titleNode
    }

    if (titleNode.includes('<span') || titleNode.includes('<b') || titleNode.includes('<strong')) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }

    const match = titleNode.match(/^(Automatic)(.*)$/i)
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

const AutomaticToolSwitch: FC<AutomaticToolSwitchProps> = ({
    title,
    subtitle = DEFAULT_SUBTITLE,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    subHeading = DEFAULT_SUBHEADING,
    subDescription = DEFAULT_SUBDESCRIPTION,
    variants,
    className
}) => {
    const finalVariants = variants && variants.length > 0 ? variants : DEFAULT_VARIANTS
    const finalImage = image || DEFAULT_IMAGE

    return (
        <section className={clsx(styles.automaticToolSwitch, className)}>
            <div className={styles.topSection}>
                <div className={styles.textColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderTitle(title)}
                    </Typography>

                    {subtitle && (
                        <Typography tag='p' size='s' weight='regular' className={styles.subtitle}>
                            {subtitle}
                        </Typography>
                    )}

                    {description && (
                        <div className={styles.description}>
                            {renderText(description)}
                        </div>
                    )}

                    {subHeading && (
                        <Typography tag='h3' size='xl' weight='bold' className={styles.subHeading}>
                            {subHeading}
                        </Typography>
                    )}

                    {subDescription && (
                        <div className={styles.subDescription}>
                            {renderText(subDescription)}
                        </div>
                    )}
                </div>

                <div className={styles.imageColumn}>
                    {finalImage && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={finalImage}
                                alt={typeof title === 'string' ? title : 'Automatic Tool Switch'}
                                width={1063}
                                height={500}
                                className={styles.image}
                                priority
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.variantsGrid}>
                {finalVariants.map((variant) => {
                    const videoSrc = variant.video || variant.videoUrl
                    const footerText = variant.warning || variant.footerLabel
                    const isWarning = Boolean(variant.isWarning || variant.warning)

                    return (
                        <div key={variant.id} className={styles.variantCard}>
                            <div className={styles.thumbnailWrapper}>
                                {videoSrc ? (
                                    <video
                                        src={videoSrc}
                                        controls
                                        className={styles.video}
                                    />
                                ) : variant.thumbnail ? (
                                    <div className={styles.thumbnailImageWrapper}>
                                        <Image
                                            src={variant.thumbnail}
                                            alt={variant.title}
                                            width={442}
                                            height={215}
                                            className={styles.thumbnailImage}
                                        />
                                        <div className={styles.playOverlay}>
                                            <div className={styles.playButton}>
                                                <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M28.5 16.4551L0 32.9096L0 0.0006L28.5 16.4551Z" fill="#D9D9D9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.placeholderThumbnail}>
                                        <div className={styles.playButton}>
                                            <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.5 16.4551L0 32.9096L0 0.0006L28.5 16.4551Z" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.cardContent}>
                                <Typography tag='h4' size='m' weight='bold' className={styles.variantTitle}>
                                    {variant.title}
                                </Typography>

                                <div className={styles.variantDescription}>
                                    {renderText(variant.description)}
                                </div>

                                {footerText && (
                                    <Typography
                                        tag='p'
                                        size='s'
                                        weight='regular'
                                        className={clsx(styles.footerLabel, isWarning && styles.warning)}
                                    >
                                        {footerText}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default AutomaticToolSwitch
