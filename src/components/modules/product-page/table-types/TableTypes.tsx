'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './TableTypes.module.scss'
import { hasHighlightMarkers, renderHighlightedTitle } from '@/utils/highlight-title'

export interface TableTypeItem {
    id: string
    title: string
    description: ReactNode
    attachment?: string
    image?: string
    videoUrl?: string
    advantagesTitle?: string
    advantages?: (string | ReactNode)[]
    list?: (string | ReactNode)[]
}

interface TableTypesProps {
    title?: ReactNode
    items?: TableTypeItem[]
    className?: string
}

const DEFAULT_TITLE = 'Table types for your tasks'

const DEFAULT_ITEMS: TableTypeItem[] = [
    {
        id: 't-slot',
        title: 'T-slot',
        description:
            'T-slot tables are characterised by their secure clamping, modularity, precision and flexibility. They allow for easy and versatile workpiece clamping, making them suitable for a wide range of materials, including wood, plastic, aluminum, PVC, acrylic, double-color plate, etc.'
    },
    {
        id: 'vacuum',
        title: 'Vacuum',
        description:
            'It has the characteristics of low cost, flexible method, cost-saving, and the price is lower than the price of the vacuum table.Vacuum tables provide uniform suction across large surfaces, making them ideal for large sheet materials. They are commonly used for cutting plywood, MDF, acrylic, and plastics.',
        advantagesTitle: 'Advantages of a vacuum table:',
        advantages: [
            'Versatile clamping: vacuum tables clamp the workpiece evenly across its entire surface;'
        ],
        list: [
            'Less damage: vacuum tables clamp the material more gently and minimise the risk of damage. This is particularly important when working with sensitive or finished materials;',
            'Quick material change: on a vacuum table, less time is spent adjusting the clamp. Therefore, material change is easier, which increases productivity.'
        ]
    },
    {
        id: 'bath',
        title: 'Bath',
        description:
            'The pump operates on a 380-volt power supply, and depending on the number of pumps and table size, the total power can range from 5.5 kW to 7.5 kW.When using the Milling Bath you can machine various materials under water or other liquids.',
        list: [
            'Suitable for milling metal, PCB cuprexit, plexi glass and other material;',
            'Better result and slower dulling of the tool when milling in liquid (water, oil or other cooling liquid)'
        ]
    }
]

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Table types</span> for your tasks
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

    const match = titleNode.match(/^(table\s+types?)(.*)$/i)
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

const renderItemText = (content: string | ReactNode) => {
    if (typeof content !== 'string') return content
    if (content.includes('<') && content.includes('>')) {
        return <span dangerouslySetInnerHTML={{ __html: content }} />
    }
    return content
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
        descNode.includes('<span') ||
        descNode.includes('<b') ||
        descNode.includes('<strong')
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

const TableTypes: FC<TableTypesProps> = ({
    title = DEFAULT_TITLE,
    items,
    className
}) => {
    const finalItems = items && items.length > 0 ? items : DEFAULT_ITEMS

    return (
        <section className={clsx(styles.tableTypes, className)}>
            <Typography tag='h2' size='xxl' weight='bold' className={styles.mainTitle}>
                {renderTitle(title)}
            </Typography>

            <div className={styles.grid}>
                {finalItems.map((item) => {
                    const videoSrc = item.videoUrl
                    const mediaSrc = item.attachment || item.image || item.videoUrl
                    const isVideo = Boolean(
                        item.videoUrl ||
                        (typeof mediaSrc === 'string' &&
                            (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(mediaSrc) ||
                                mediaSrc.includes('youtube') ||
                                mediaSrc.includes('vimeo')))
                    )
                    const videoUrl = isVideo ? (videoSrc || (typeof mediaSrc === 'string' ? mediaSrc : undefined)) : undefined
                    const imageSrc = !isVideo && typeof mediaSrc === 'string' ? mediaSrc : item.image

                    return (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imagePlaceholder}>
                                {videoUrl ? (
                                    <video
                                        src={videoUrl}
                                        controls
                                        poster={imageSrc}
                                        className={styles.video}
                                    />
                                ) : imageSrc ? (
                                    <div className={styles.thumbnailImageWrapper}>
                                        <Image
                                            src={imageSrc}
                                            alt={item.title}
                                            fill
                                            className={styles.thumbnailImage}
                                        />
                                    </div>
                                ) : (
                                    <div className={styles.playIcon}>
                                        <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 16.4551L0 32.9096L0 0.0006L28.5 16.4551Z" fill="#D9D9D9" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className={styles.content}>
                                <Typography tag='h3' size='l' weight='bold' className={styles.title}>
                                    {item.title}
                                </Typography>

                                <div className={styles.description}>
                                    {renderDescription(item.description)}
                                </div>

                                {item.advantagesTitle && (
                                    <Typography tag='h4' size='s' weight='bold' className={styles.advantagesTitle}>
                                        {item.advantagesTitle}
                                    </Typography>
                                )}

                                {item.advantages && item.advantages.length > 0 && (
                                    <div className={styles.advantages}>
                                        {item.advantages.map((adv, idx) => (
                                            <div key={idx} className={styles.advantageItem}>
                                                {renderItemText(adv)}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {item.list && item.list.length > 0 && (
                                    <ul className={styles.list}>
                                        {item.list.map((listItem, idx) => (
                                            <li key={idx} className={styles.listItem}>
                                                {renderItemText(listItem)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default TableTypes
