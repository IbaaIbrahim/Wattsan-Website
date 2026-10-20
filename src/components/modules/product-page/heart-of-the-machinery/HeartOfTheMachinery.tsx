'use client'

import { FC, useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { HeartOfTheMachineryData } from '@my-types/product'
import { formatMediaUrl } from '@/utils/helpers'

import styles from './HeartOfTheMachinery.module.scss'

interface HeartOfTheMachineryProps {
    className?: string
    data: HeartOfTheMachineryData
}

const renderTitle = (titleNode?: ReactNode) => {
    if (!titleNode) {
        return (
            <>
                <span className={styles.redHighlight}>Heart</span> of the machinery
            </>
        )
    }
    if (typeof titleNode !== 'string') return titleNode
    if (titleNode.includes('<span')) {
        return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
    }
    const match = titleNode.match(/^(heart)(.*)$/i)
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

const HeartOfTheMachinery: FC<HeartOfTheMachineryProps> = ({ className, data }) => {
    const [activeTab, setActiveTab] = useState<string>(data?.tabs?.[0]?.id || '')

    useEffect(() => {
        if (data?.tabs?.[0]?.id && (!activeTab || !data.tabs.some(t => t.id === activeTab))) {
            setActiveTab(data.tabs[0].id)
        }
    }, [data, activeTab])

    if (!data || !data.tabs || data.tabs.length === 0) return null

    const activeContent = data.content?.[activeTab] || data.content?.[data.tabs[0]?.id]
    if (!activeContent) return null

    const imageSrc = formatMediaUrl(activeContent.image)

    return (
        <div className={clsx(styles.container, className)}>
            <Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
                {renderTitle(data.title)}
            </Typography>

            <div className={styles.contentWrapper}>
                <div className={styles.leftColumn}>
                    <div className={styles.topContent}>
                        <div className={styles.tabs}>
                            {data.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type='button'
                                    className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className={styles.tabText}>
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className={styles.textGroup}>
                            <Typography tag='h3' size='xl' weight='bold' className={styles.contentTitle}>
                                {activeContent.title}
                            </Typography>
                            <Typography tag='p' size='m' weight='regular' className={styles.contentDescription}>
                                {activeContent.description}
                            </Typography>
                        </div>
                    </div>

                    {activeContent.details && activeContent.details.length > 0 && (
                        <div className={styles.details}>
                            {activeContent.details.map((detail, index) => (
                                <div key={index} className={styles.detailItem}>
                                    <span className={styles.detailValue}>
                                        {detail.value}
                                    </span>
                                    <span className={styles.detailLabel}>
                                        {detail.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {imageSrc && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={imageSrc}
                            alt={activeContent.title || 'Component'}
                            width={536}
                            height={536}
                            priority
                            className={styles.image}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeartOfTheMachinery
