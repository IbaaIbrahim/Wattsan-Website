import React, { ReactNode, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaOptionsType } from 'embla-carousel'
import styles from './EmblaCarousel.module.scss'

type PropType = {
    slides: any[]
    options?: EmblaOptionsType
    renderItem: (item: any, index: number) => ReactNode
    className?: string
    slideClassName?: string
    minHeight?: string | number
    matchHeight?: boolean
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options, renderItem, className, slideClassName, minHeight, matchHeight } = props
    const [emblaRef] = useEmblaCarousel(options, [Autoplay()])

    const containerStyles = matchHeight ? { alignItems: 'stretch' } : {}
    const viewportStyles = minHeight ? { minHeight } : {}

    return (
        <div className={`${styles.embla} ${className || ''}`}>
            <div className={styles.embla__viewport} ref={emblaRef} style={viewportStyles}>
                <div className={styles.embla__container} style={containerStyles}>
                    {slides.map((item, index) => (
                        <div className={`${styles.embla__slide} ${slideClassName || ''}`} key={index}>
                            {renderItem(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
