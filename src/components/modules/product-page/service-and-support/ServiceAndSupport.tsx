'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ServiceAndSupport.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import warrantyIcon from '@public/img/icons/service-and-support/warranty.svg'
import historyIcon from '@public/img/icons/service-and-support/history.svg'
import supportIcon from '@public/img/icons/service-and-support/support.svg'
import educationIcon from '@public/img/icons/service-and-support/education.svg'
import { SupportCard } from '@my-types/product'

const ICON_MAP: Record<string, any> = {
    warranty: warrantyIcon,
    history: historyIcon,
    support: supportIcon,
    training: educationIcon,
    education: educationIcon
}

const DEFAULT_CARDS: SupportCard[] = [
    {
        id: '1',
        icon: 'warranty',
        title: 'Warranty and Returns',
        description:
            'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.'
    },
    {
        id: '2',
        icon: 'history',
        title: 'History of the machine',
        description:
            'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.'
    },
    {
        id: '3',
        icon: 'support',
        title: 'Offline and online support',
        description:
            'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.'
    },
    {
        id: '4',
        icon: 'education',
        title: 'Education content',
        description:
            'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.'
    }
]

const DEFAULT_IMAGE = '/product-cards/cnc-router/service-and-support/image 11691.png'

const getCardIcon = (card: SupportCard) => {
    if (card.icon && ICON_MAP[card.icon]) {
        return ICON_MAP[card.icon]
    }
    const titleLower = (card.title || '').toLowerCase()
    if (titleLower.includes('warranty') || titleLower.includes('return')) return warrantyIcon
    if (titleLower.includes('history')) return historyIcon
    if (titleLower.includes('education') || titleLower.includes('training')) return educationIcon
    return supportIcon
}

interface ServiceAndSupportProps {
    className?: string
    image?: string
    cards?: SupportCard[]
}

const ServiceAndSupport: FC<ServiceAndSupportProps> = ({ className, image, cards }) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const displayCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS
    const displayImage = image || DEFAULT_IMAGE

    const scroll = (direction: 'left' | 'right') => {
        if (trackRef.current) {
            const children = trackRef.current.children
            if (children.length > 0) {
                const first = children[0] as HTMLElement
                const second = children[1] as HTMLElement
                const scrollAmount = second
                    ? second.offsetLeft - first.offsetLeft
                    : first.offsetWidth + 40

                trackRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <div className={styles.headerRow}>
                    <h2 className={styles.title}>
                        We provide the best <span className={styles.redText}>service and support</span>
                    </h2>

                    {/* Navigation Arrows */}
                    <div className={styles.controls}>
                        <button
                            type="button"
                            className={clsx(styles.controlButton, styles.prevButton)}
                            onClick={() => scroll('left')}
                            aria-label="Previous"
                        >
                            <Image src={arrowIcon} alt="Previous" width={18} height={12} />
                        </button>
                        <button
                            type="button"
                            className={clsx(styles.controlButton, styles.nextButton)}
                            onClick={() => scroll('right')}
                            aria-label="Next"
                        >
                            <Image src={arrowIcon} alt="Next" width={18} height={12} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    {displayImage && (
                        <Image
                            src={displayImage}
                            alt="Service and Support"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 1005px"
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>

                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderTrack} ref={trackRef}>
                        {displayCards.map((card: any) => {
                            const iconAsset = getCardIcon(card)
                            return (
                                <div key={card.id} className={styles.card}>
                                    <div className={styles.cardIcon}>
                                        {card.logo ? (
                                            <img
                                                src={card.logo}
                                                alt={card.title}
                                                width={24}
                                                height={24}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <Image
                                                src={iconAsset}
                                                alt=""
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                    </div>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <div
                                        className={styles.cardDescription}
                                        dangerouslySetInnerHTML={{ __html: card.description || '' }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceAndSupport
