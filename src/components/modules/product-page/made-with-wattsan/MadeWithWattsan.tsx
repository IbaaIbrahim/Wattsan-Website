'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ContactSection from '@components/modules/common/contact-section/ContactSection'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import { MadeWithWattsanSlide } from '@my-types/product'
import styles from './MadeWithWattsan.module.scss'

interface MadeWithWattsanProps {
    image?: string
    slides?: MadeWithWattsanSlide[]
    className?: string
}

const DEFAULT_SLIDES: MadeWithWattsanSlide[] = [
    {
        id: '1',
        image: '/product-cards/cnc-router/image 11680.png',
        author: 'Jose Rodriguez',
        tag: 'CNC routing by Wattsan'
    }
]

const MadeWithWattsan: FC<MadeWithWattsanProps> = ({ image, slides, className }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const effectiveSlides: MadeWithWattsanSlide[] =
        slides && slides.length > 0
            ? slides
            : image
            ? [{ id: '1', image, author: 'Jose Rodriguez', tag: 'CNC routing by Wattsan' }]
            : DEFAULT_SLIDES

    const safeIndex = activeIndex % effectiveSlides.length
    const currentSlide = effectiveSlides[safeIndex] || DEFAULT_SLIDES[0]

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + effectiveSlides.length) % effectiveSlides.length)
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % effectiveSlides.length)
    }

    const authorLabel = currentSlide.author
        ? currentSlide.author.toLowerCase().startsWith('author')
            ? currentSlide.author
            : `Author: ${currentSlide.author}`
        : ''

    const renderLeftContent = () => (
        <div className={styles.imageColumn}>
            <Image
                src={currentSlide.image || '/product-cards/cnc-router/image 11680.png'}
                alt={currentSlide.tag || 'Made with Wattsan CNC machine'}
                fill
                sizes="(max-width: 968px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
            />

            {/* Navigation Arrows */}
            <div className={styles.sliderControls}>
                <button
                    type="button"
                    className={clsx(styles.navButton, styles.prevButton)}
                    onClick={handlePrev}
                    aria-label="Previous image"
                >
                    <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                </button>
                <button
                    type="button"
                    className={clsx(styles.navButton, styles.nextButton)}
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <Image src={arrowIcon} alt="Next" width={24} height={24} />
                </button>
            </div>

            {/* Bottom Tags */}
            {(authorLabel || currentSlide.tag) && (
                <div className={styles.imageTags}>
                    {authorLabel && <span className={styles.tagAuthor}>{authorLabel}</span>}
                    {currentSlide.tag && <span className={styles.tagType}>{currentSlide.tag}</span>}
                </div>
            )}
        </div>
    )

    return (
        <ContactSection
            title="Demonstration of our machines in more than 50 countries worldwide or Online"
            leftContent={renderLeftContent()}
            className={className}
        />
    )
}

export default MadeWithWattsan

