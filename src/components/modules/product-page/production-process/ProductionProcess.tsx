'use client'

import { FC, useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ProductionProcess.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import { ProductionProcessStep } from '@my-types/product'

interface ProductionProcessProps {
    className?: string
    steps: ProductionProcessStep[]
}

const formatStepNumber = (step: ProductionProcessStep, index: number): string => {
    const raw = step.step_number || (/^\d+$/.test(step.id) ? step.id : String(index + 1))
    return String(raw).padStart(2, '0')
}

const ProductionProcess: FC<ProductionProcessProps> = ({ className, steps = [] }) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollAndActiveIndex = useCallback(() => {
        if (!trackRef.current) return
        const track = trackRef.current
        const { scrollLeft, scrollWidth, clientWidth } = track

        setCanScrollLeft(scrollLeft > 4)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)

        const cards = Array.from(track.children) as HTMLElement[]
        if (cards.length === 0) return

        const trackRect = track.getBoundingClientRect()
        let closestIndex = 0
        let minDistance = Infinity

        cards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect()
            const distance = Math.abs(cardRect.left - trackRect.left)
            if (distance < minDistance) {
                minDistance = distance
                closestIndex = idx
            }
        })

        setActiveIndex(closestIndex)
    }, [])

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        updateScrollAndActiveIndex()

        const handleScroll = () => {
            updateScrollAndActiveIndex()
        }

        track.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', updateScrollAndActiveIndex)

        return () => {
            track.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateScrollAndActiveIndex)
        }
    }, [updateScrollAndActiveIndex, steps])

    if (!steps || steps.length === 0) {
        return null
    }

    const scroll = (direction: 'left' | 'right') => {
        if (trackRef.current) {
            const firstCard = trackRef.current.children[0] as HTMLElement | undefined
            const cardWidth = firstCard?.offsetWidth || 748
            const style = window.getComputedStyle(trackRef.current)
            const gap = parseFloat(style.columnGap || style.gap) || 80
            const scrollAmount = cardWidth + gap

            trackRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const handleTabClick = (index: number) => {
        setActiveIndex(index)
        if (trackRef.current) {
            const targetCard = trackRef.current.children[index] as HTMLElement | undefined
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                })
            }
        }
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.redText}>Production</span> process
                </h2>

                {/* Navigation Arrows (Desktop / Tablet) */}
                <div className={styles.controls}>
                    <button
                        className={clsx(styles.controlButton, styles.prevButton)}
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        aria-label="Previous step"
                    >
                        <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                    </button>
                    <button
                        className={clsx(styles.controlButton, styles.nextButton)}
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        aria-label="Next step"
                    >
                        <Image src={arrowIcon} alt="Next" width={24} height={24} />
                    </button>
                </div>
            </div>

            {/* Step Navigator Tabs (Mobile) */}
            <div className={styles.mobileTabs}>
                {steps.map((step, index) => {
                    const stepNumber = formatStepNumber(step, index)
                    const isActive = activeIndex === index

                    return (
                        <button
                            key={step.id || index}
                            type="button"
                            className={clsx(styles.tabItem, isActive && styles.activeTab)}
                            onClick={() => handleTabClick(index)}
                            aria-label={`Go to step ${stepNumber}: ${step.title}`}
                        >
                            <div className={styles.tabIndicator} />
                            <div className={styles.tabBadge}>{stepNumber}</div>
                        </button>
                    )
                })}
            </div>

            {/* Slider Track with Cards */}
            <div className={styles.sliderTrack} ref={trackRef}>
                {steps.map((step, index) => {
                    const stepNumber = formatStepNumber(step, index)

                    return (
                        <div key={step.id || index} className={styles.card}>
                            <div className={styles.cardText}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.stepNumber}>{stepNumber}</div>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                </div>
                                <div
                                    className={styles.stepDescription}
                                    dangerouslySetInnerHTML={{ __html: step.description || '' }}
                                />
                            </div>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={748}
                                    height={420}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ProductionProcess
