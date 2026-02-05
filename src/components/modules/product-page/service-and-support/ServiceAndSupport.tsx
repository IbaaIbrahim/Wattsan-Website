'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ServiceAndSupport.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import warrantyIcon from '@public/img/icons/config.svg'
import historyIcon from '@public/img/icons/favorites.svg'
import supportIcon from '@public/img/icons/account.svg'

interface ServiceAndSupportProps {
    className?: string
}

const ServiceAndSupport: FC<ServiceAndSupportProps> = ({ className }) => {
    const trackRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.clientWidth || 300
            const gap = 24
            const scrollAmount = cardWidth + gap

            trackRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const cards = [
        {
            id: 'warranty',
            title: 'Warranty and Returns',
            description: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            icon: warrantyIcon
        },
        {
            id: 'history',
            title: 'History of the machine',
            description: 'We keep a detailed history of every machine we manufacture. This allows us to quickly identify parts and configurations for future service needs or upgrades.',
            icon: historyIcon
        },
        {
            id: 'support',
            title: 'Offline and Online Support',
            description: 'Our expert team is available to assist you with any questions or issues. Whether you need remote troubleshooting or on-site assistance, we are here to help.',
            icon: supportIcon
        },
        // Duplicate for scroll effect testing if needed
        {
            id: 'training',
            title: 'Training',
            description: 'Comprehensive training programs to ensure your team can operate the machine efficiently and safely from day one.',
            icon: supportIcon
        }
    ]

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h2 className={styles.title}>
                        We provide the best <span className={styles.redText}>service and support</span>
                    </h2>

                    {/* Navigation Arrows */}
                    <div className={styles.controls}>
                        <button className={clsx(styles.controlButton, styles.prevButton)} onClick={() => scroll('left')} aria-label="Previous">
                            <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                        </button>
                        <button className={clsx(styles.controlButton, styles.nextButton)} onClick={() => scroll('right')} aria-label="Next">
                            <Image src={arrowIcon} alt="Next" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/product-cards/cnc-router/service-and-support/image 11691.png"
                        alt="Service and Support"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderTrack} ref={trackRef}>
                        {cards.map((card) => (
                            <div key={card.id} className={styles.card}>
                                <div className={styles.cardIcon}>
                                    <Image src={card.icon} alt="" width={32} height={32} />
                                </div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDescription}>
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceAndSupport
