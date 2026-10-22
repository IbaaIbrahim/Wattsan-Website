'use client'

import { FC, ReactNode, MouseEvent } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import { renderHighlightedTitle } from '@/utils/highlight-title'
import styles from './AdditionalContent.module.scss'

export type ContentType = 'video' | 'pdf' | 'image'

export interface AdditionalContentItem {
    id: string
    type: ContentType
    title: string
    subtitle: string
    link: string
}

export interface AdditionalContentProps {
    title?: ReactNode
    description?: string
    buttonText?: string
    buttonHref?: string
    onButtonClick?: () => void
    showButton?: boolean
    isLoggedIn?: boolean
    items?: AdditionalContentItem[]
    className?: string
}

// Crisp SVGs exported directly from Figma
const VideoIcon: FC = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="6" fill="white" />
        <path
            d="M17 18.8545C17 15.881 20.1295 13.9466 22.7891 15.2764L49.0811 28.4229C52.0287 29.8971 52.0289 34.104 49.0811 35.5781L22.7891 48.7236C20.1295 50.0534 17 48.119 17 45.1455V18.8545ZM21.8945 17.0654C20.5647 16.4005 19 17.3677 19 18.8545V45.1455C19 46.6323 20.5647 47.5995 21.8945 46.9346L48.1865 33.7891C49.6604 33.052 49.6604 30.948 48.1865 30.2109L21.8945 17.0654ZM24.6543 25.1602C24.9401 24.9764 25.3 24.9502 25.6094 25.0908L38.8096 31.0908C39.1663 31.2531 39.3954 31.6091 39.3955 32.001C39.3955 32.393 39.1664 32.7498 38.8096 32.9121L25.6094 38.9121C25.2999 39.0528 24.9401 39.0258 24.6543 38.8418C24.3684 38.6577 24.1953 38.341 24.1953 38.001V26.001C24.1954 25.6611 24.3685 25.3442 24.6543 25.1602Z"
            fill="black"
        />
    </svg>
)

const PdfIcon: FC = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="6" fill="white" />
        <path
            d="M32.7236 14C33.7262 14 34.6925 14.3762 35.4307 15.0547L46.7061 25.4199C47.53 26.1773 47.999 27.2451 47.999 28.3643V46C47.999 48.2091 46.2082 50 43.999 50H20C17.7909 50 16 48.2091 16 46V18C16 15.7909 17.7909 14 20 14H32.7236ZM20 16C18.8954 16 18 16.8954 18 18V46C18 47.1046 18.8954 48 20 48H43.999C45.1036 48 45.999 47.1046 45.999 46V28.3643C45.999 28.257 45.9875 28.1513 45.9707 28.0469H36.8906C34.6815 28.0469 32.8906 26.256 32.8906 24.0469V16.0078C32.8353 16.0032 32.7796 16 32.7236 16H20ZM25.9082 35.5732C26.4351 35.5733 26.8899 35.6814 27.2725 35.8984C27.6574 36.1131 27.9546 36.4138 28.1631 36.7998C28.3715 37.1833 28.4756 37.6298 28.4756 38.1387C28.4755 38.6499 28.3683 39.097 28.1553 39.4805C27.9445 39.8615 27.6437 40.1573 27.252 40.3672C26.8602 40.577 26.3949 40.6826 25.8564 40.6826H24.7012V42.9834H23V35.5732H25.9082ZM31.9121 35.5732C32.6293 35.5732 33.2478 35.7209 33.7656 36.0176C34.2857 36.3119 34.686 36.7372 34.9678 37.292C35.2496 37.8444 35.3906 38.505 35.3906 39.2744C35.3906 40.0463 35.2496 40.7098 34.9678 41.2646C34.6882 41.8194 34.2887 42.2453 33.7686 42.542C33.2484 42.8363 32.6309 42.9834 31.916 42.9834H29.3145V35.5732H31.9121ZM41.1895 37.0273H38.0859V38.5469H40.8838V40.0059H38.0859V42.9834H36.3848V35.5732H41.1895V37.0273ZM31.0156 41.4561H31.8506C32.2445 41.4561 32.578 41.3868 32.8506 41.2471C33.1255 41.1048 33.3329 40.8739 33.4727 40.5557C33.6147 40.2348 33.6865 39.8075 33.6865 39.2744C33.6865 38.7414 33.6147 38.317 33.4727 38.001C33.3306 37.6826 33.121 37.4534 32.8438 37.3135C32.5688 37.1712 32.2294 37.0996 31.8262 37.0996H31.0156V41.4561ZM24.7012 39.2705H25.54C25.7966 39.2705 26.0108 39.2239 26.1826 39.1299C26.3568 39.0358 26.4888 38.9042 26.5781 38.7354C26.6674 38.5642 26.7119 38.3653 26.7119 38.1387C26.7119 37.9095 26.6675 37.7114 26.5781 37.5449C26.4888 37.3761 26.3568 37.246 26.1826 37.1543C26.0085 37.0627 25.7943 37.0166 25.54 37.0166H24.7012V39.2705ZM34.8906 24.0469C34.8906 24.1251 34.8965 24.2025 34.9053 24.2783L42.6279 26.0469H44.4336L34.8906 17.2744V24.0469Z"
            fill="black"
        />
    </svg>
)

const ImageIcon: FC = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="6" fill="white" />
        <path
            d="M46 14C48.2091 14 50 15.7909 50 18V47C50 48.6568 48.6569 50 47 50H18C15.7909 50 14 48.2091 14 46V18C14 15.7909 15.7909 14 18 14H46ZM18 16C16.8954 16 16 16.8954 16 18V46C16 47.1046 16.8954 48 18 48H19.5859L36.9512 30.6348C37.5153 30.0707 38.2505 29.7764 38.9932 29.7568C39.0859 29.7544 39.1788 29.7566 39.2715 29.7627C39.3643 29.7688 39.4568 29.7792 39.5488 29.7939C39.733 29.8234 39.9154 29.8695 40.0928 29.9336C40.4471 30.0616 40.7827 30.2596 41.0791 30.5264L48 36.7549V18C48 16.8954 47.1046 16 46 16H18ZM22.4141 48H46C47.1046 48 48 47.1046 48 46V40.4883C47.7724 40.7826 47.4844 41.0413 47.1367 41.2441L44.7461 42.6387C43.6328 43.2881 42.2288 43.1543 41.2588 42.3057L39.083 40.4023C38.8491 40.1977 38.5333 40.1129 38.2285 40.1738L35.2451 40.7705C34.2617 40.9671 33.2453 40.6593 32.5361 39.9502L32.207 39.6211C31.9587 39.3728 31.7651 39.0909 31.6221 38.791L22.4141 48ZM39.7412 32.0127C39.3707 31.6792 38.8162 31.6724 38.4385 31.9824C38.4132 32.0031 38.3888 32.0253 38.3652 32.0488L33.6211 36.793C33.2306 37.1835 33.2306 37.8165 33.6211 38.207L33.9502 38.5361C34.1866 38.7724 34.5257 38.8751 34.8535 38.8096L37.8369 38.2129C38.7512 38.0301 39.6986 38.2826 40.4004 38.8965L42.5762 40.7998C42.8995 41.0827 43.3672 41.1276 43.7383 40.9111L46.1289 39.5166C46.7138 39.1751 46.7973 38.3634 46.2939 37.9102L39.7412 32.0127ZM25.5 21C27.9853 21 30 23.0147 30 25.5C30 27.9853 27.9853 30 25.5 30C23.0147 30 21 27.9853 21 25.5C21 23.0147 23.0147 21 25.5 21Z"
            fill="black"
        />
    </svg>
)

const ExternalLinkIcon: FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18.0039 5C18.556 5.00019 19.0039 5.44783 19.0039 6V13.6387C19.0037 14.1907 18.5559 14.6385 18.0039 14.6387C17.4517 14.6387 17.0041 14.1908 17.0039 13.6387V8.41016L6.70703 18.707C6.31651 19.0976 5.68349 19.0976 5.29297 18.707C4.90244 18.3165 4.90244 17.6835 5.29297 17.293L15.5859 7H10.3672C9.8149 7 9.36719 6.55228 9.36719 6C9.36719 5.44772 9.8149 5 10.3672 5H18.0039Z"
            fill="currentColor"
        />
    </svg>
)

const DownloadActionIcon: FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.67058 9.62763C8.26087 9.25728 7.62851 9.28919 7.25816 9.6989C6.88782 10.1086 6.91973 10.741 7.32944 11.1113L11.3459 14.7418C11.7266 15.086 12.3062 15.0861 12.6869 14.7419L16.6705 11.1416C17.0803 10.7713 17.1122 10.1389 16.7419 9.72919C16.3716 9.31945 15.7392 9.28749 15.3295 9.65781L13.0164 11.7483V3C13.0164 2.44772 12.5687 2 12.0164 2C11.4641 2 11.0164 2.44771 11.0164 3V11.7481L8.67058 9.62763Z"
            fill="currentColor"
        />
        <path
            d="M3 11C3 10.4477 2.55228 10 2 10C1.44772 10 1 10.4477 1 11V20C1 20.5523 1.44772 21 2 21H22C22.5523 21 23 20.5523 23 20V11C23 10.4477 22.5523 10 22 10C21.4477 10 21 10.4477 21 11V19H3V11Z"
            fill="currentColor"
        />
    </svg>
)

const AdditionalContent: FC<AdditionalContentProps> = ({
    title,
    description = 'Here you will find some of the materials for training and equipment operation. The full list is available after registration in the support section, where there are many additional resources.',
    buttonText = 'Log in or sign up',
    buttonHref,
    onButtonClick,
    showButton,
    isLoggedIn,
    items = [],
    className
}) => {
    const authorizedFromStore = authStore.use.authorized()
    const isUserLoggedIn = isLoggedIn ?? authorizedFromStore
    const shouldShowButton = showButton ?? !isUserLoggedIn

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

    const handleButtonClick = (e: MouseEvent<HTMLElement>) => {
        if (onButtonClick) {
            onButtonClick()
            return
        }

        if (buttonHref) {
            return
        }

        e.preventDefault()
        modalsStore.set.open(MODALS.login, {
            initialScreen: 'LOGIN',
            closeOnEscape: false,
            onComplete: (data?: { type?: string }) => {
                if (data?.type === 'register') {
                    modalsStore.set.open(MODALS.registerSuccessModal, {
                        styles: { display: 'block' }
                    })
                } else {
                    modalsStore.set.close()
                }
            }
        })
    }

    const renderIcon = (type: ContentType) => {
        switch (type) {
            case 'video':
                return <VideoIcon />
            case 'pdf':
                return <PdfIcon />
            case 'image':
                return <ImageIcon />
            default:
                return <PdfIcon />
        }
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.textSide}>
                        <h2 className={styles.title}>
                            {renderHighlightedTitle(title, styles.redText) || (
                                <>
                                    Additional <span className={styles.redText}>content</span>
                                </>
                            )}
                        </h2>
                        {description && (
                            <p className={styles.description}>
                                {description}
                            </p>
                        )}
                    </div>

                    {shouldShowButton && (
                        buttonHref ? (
                            <Link
                                href={buttonHref}
                                className={styles.loginBtn}
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className={styles.loginBtn}
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </button>
                        )
                    )}
                </div>

                <div className={styles.grid}>
                    {displayItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            className={styles.card}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.cardIcon}>
                                {renderIcon(item.type)}
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardTitle}>
                                    {item.title}
                                </p>
                                <p className={styles.cardSubtitle}>
                                    {item.subtitle}
                                </p>
                            </div>
                            <div className={styles.actionBtn}>
                                {item.type === 'video' ? (
                                    <ExternalLinkIcon />
                                ) : (
                                    <DownloadActionIcon />
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
