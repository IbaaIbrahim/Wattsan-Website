import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import styles from './AdditionalContent.module.scss'

// Icons (using external link and download icons)
import externalLinkIcon from '@public/img/icons/arrow-left.svg' // Will rotate for external link
import downloadIcon from '@public/img/icons/favorites.svg' // Placeholder - using similar available icon or SVG

export type ContentType = 'video' | 'pdf' | 'image'

export interface AdditionalContentItem {
    id: string
    type: ContentType
    title: string
    subtitle: string
    link: string
}

interface AdditionalContentProps {
    items?: AdditionalContentItem[]
    className?: string
}

const AdditionalContent: FC<AdditionalContentProps> = ({ items = [], className }) => {
    const defaultItems: AdditionalContentItem[] = [
        {
            id: '1',
            type: 'video',
            title: 'Installation and setup of the laser machine',
            subtitle: 'www.youtube.com',
            link: 'https://youtube.com'
        },
        {
            id: '2',
            type: 'pdf',
            title: 'Understanding the machine components',
            subtitle: 'compjnents.pdf',
            link: '/files/components.pdf'
        },
        {
            id: '3',
            type: 'image',
            title: 'Introduction to basic safety protocols',
            subtitle: 'Basic_Safety_Protocols.jpg',
            link: '/img/safety.jpg'
        },
        {
            id: '4',
            type: 'pdf',
            title: 'Understanding the machine components',
            subtitle: 'compjnents.pdf',
            link: '/files/components.pdf'
        }
    ]

    const displayItems = items.length > 0 ? items : defaultItems

    const renderIcon = (type: ContentType) => {
        switch (type) {
            case 'video':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 6V18L17 12L7 6Z" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                )
            case 'pdf':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            case 'image':
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="black" strokeWidth="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="black" />
                        <path d="M21 15L16 10L5 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
        }
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.textSide}>
                        <Typography tag='h2' size='xl' weight='semi-bold' className={styles.title}>
                            Additional <span className={styles.redText}>content</span>
                        </Typography>
                        <Typography tag='p' size='s' weight='regular' className={styles.description}>
                            Here you will find some of the materials for training and equipment operation. The full list is available after registration in the support section, where there are many additional resources.
                        </Typography>
                    </div>
                    <Button view='bordered' size='m' className={styles.loginBtn}>
                        Log in or sign up
                    </Button>
                </div>

                <div className={styles.grid}>
                    {displayItems.map((item) => (
                        <a key={item.id} href={item.link} className={styles.card} target="_blank" rel="noopener noreferrer">
                            <div className={styles.cardIcon}>
                                {renderIcon(item.type)}
                            </div>
                            <div className={styles.cardContent}>
                                <Typography tag='p' size='m' weight='semi-bold' className={styles.cardTitle}>
                                    {item.title}
                                </Typography>
                                <Typography tag='p' size='s' weight='regular' className={styles.cardSubtitle}>
                                    {item.subtitle}
                                </Typography>
                            </div>
                            <div className={styles.actionBtn}>
                                {item.type === 'video' ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-45deg)' }}>
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AdditionalContent
