'use client'

import { FC, ReactNode } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './TableTypes.module.scss'

export interface TableTypeItem {
    id: string
    title: string
    description: ReactNode
    image?: string
    advantagesTitle?: string
    advantages?: (string | ReactNode)[]
    list?: (string | ReactNode)[]
}

interface TableTypesProps {
    title: ReactNode
    items: TableTypeItem[]
    className?: string
}

const TableTypes: FC<TableTypesProps> = ({
    title,
    items,
    className
}) => {
    return (
        <section className={clsx(styles.tableTypes, className)}>
            <Typography tag='h2' size='xxl' weight='bold' className={styles.mainTitle}>
                {title}
            </Typography>

            <div className={styles.grid}>
                {items.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.playIcon}>
                                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M43.0417 30.5L22.9167 43.1026L22.9167 17.8974L43.0417 30.5Z" fill="#D1D1D1" />
                                </svg>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <Typography tag='h3' size='l' weight='bold' className={styles.title}>
                                {item.title}
                            </Typography>

                            <div className={styles.description}>
                                {typeof item.description === 'string' ? (
                                    <Typography tag='p' size='s' weight='regular'>
                                        {item.description}
                                    </Typography>
                                ) : (
                                    item.description
                                )}
                            </div>

                            {item.advantagesTitle && (
                                <Typography tag='h4' size='s' weight='bold' className={styles.advantagesTitle}>
                                    {item.advantagesTitle}
                                </Typography>
                            )}

                            {item.advantages && (
                                <div className={styles.advantages}>
                                    {item.advantages.map((adv, idx) => (
                                        <div key={idx} className={styles.advantageItem}>
                                            {typeof adv === 'string' ? (
                                                <Typography tag='p' size='s' weight='regular'>
                                                    {adv}
                                                </Typography>
                                            ) : (
                                                adv
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item.list && (
                                <ul className={styles.list}>
                                    {item.list.map((listItem, idx) => (
                                        <li key={idx} className={styles.listItem}>
                                            <Typography tag='p' size='s' weight='regular'>
                                                {listItem}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TableTypes
