'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ProductionProcess.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'

interface ProductionProcessProps {
    className?: string
}

const ProductionProcess: FC<ProductionProcessProps> = ({ className }) => {
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

    const steps = [
        {
            id: '01',
            title: 'Development',
            description: 'The process begins with the creation of new equipment models based on feedback from customers, dealers, and engineers. Each model undergoes multiple tests before entering production. We use components from global leaders like Mitsubishi, HIWIN, and Raytools, ensuring quality and easy replacement availability worldwide.',
            image: '/product-cards/production-process/image 10.png'
        },
        {
            id: '02',
            title: 'Robotic Accuracy',
            description: 'Parts are cut using bandsaws and metal cutters, with special attention given to the machine bed. Beds are welded onto stacker trays to ensure perfect flatness and long-term stability, unlike competitors who often rely on manual drilling.',
            image: '/product-cards/production-process/image 11.png'
        },
        {
            id: '03',
            title: 'Precision in Each Detail',
            description: 'Specialized milling machines create connection points for guides and racks, ensuring portals move precisely and accurately along their guides. This results in superior cut quality and accuracy compared to standard methods.',
            image: '/product-cards/production-process/image 12.png'
        }
    ]

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.header}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h2 className={styles.title}>
                        <span className={styles.redText}>Production</span> process
                    </h2>

                    {/* Navigation Arrows */}
                    <div className={styles.controls}>
                        <button className={clsx(styles.controlButton, styles.prevButton)} onClick={() => scroll('left')} aria-label="Previous step">
                            <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                        </button>
                        <button className={clsx(styles.controlButton, styles.nextButton)} onClick={() => scroll('right')} aria-label="Next step">
                            <Image src={arrowIcon} alt="Next" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.sliderTrack} ref={trackRef}>
                {steps.map((step) => (
                    <div key={step.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepNumber}>{step.id}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                        </div>
                        <p className={styles.stepDescription}>
                            {step.description}
                        </p>
                        <div className={styles.imageContainer}>
                            <Image
                                src={step.image}
                                alt={step.title}
                                width={600}
                                height={338}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductionProcess
