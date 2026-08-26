import { FC, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ServiceAndSupport.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import warrantyIcon from '@public/img/icons/config.svg'
import historyIcon from '@public/img/icons/favorites.svg'
import supportIcon from '@public/img/icons/account.svg'
import { SupportCard } from '@my-types/product'

const ICON_MAP: Record<string, any> = {
    warranty: warrantyIcon,
    history: historyIcon,
    support: supportIcon,
    training: supportIcon
}

interface ServiceAndSupportProps {
    className?: string
    image?: string
    cards?: SupportCard[]
}

const ServiceAndSupport: FC<ServiceAndSupportProps> = ({ className, image, cards = [] }) => {
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
                    {image && (
                        <Image
                            src={image}
                            alt="Service and Support"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>

                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderTrack} ref={trackRef}>
                        {cards.map((card: any) => (
                            <div key={card.id} className={styles.card}>
                                <div className={styles.cardIcon}>
                                    {card.logo ? (
                                        <img src={card.logo} alt={card.title} width={32} height={32} style={{ objectFit: 'contain' }} />
                                    ) : (
                                        <Image src={ICON_MAP[card.icon] || supportIcon} alt="" width={32} height={32} />
                                    )}
                                </div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <div
                                    className={styles.cardDescription}
                                    dangerouslySetInnerHTML={{ __html: card.description || '' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceAndSupport
