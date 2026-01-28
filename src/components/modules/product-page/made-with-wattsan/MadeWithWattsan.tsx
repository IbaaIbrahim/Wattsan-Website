'use client'

import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ContactSection from '@components/modules/common/contact-section/ContactSection'
import arrowIcon from '@public/img/icons/arrow-left.svg'
import styles from './MadeWithWattsan.module.scss'

interface MadeWithWattsanProps {
    className?: string
}

const MadeWithWattsan: FC<MadeWithWattsanProps> = ({ className }) => {
    const imagePath = '/product-cards/image 11680.png'

    const renderLeftContent = () => (
        <div className={styles.imageColumn}>
            <Image
                src={imagePath}
                alt="Dinosaur skeleton model made with Wattsan CNC machine"
                fill
                sizes="(max-width: 968px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
            />

            {/* Navigation Arrows */}
            <div className={styles.sliderControls}>
                <button className={clsx(styles.navButton, styles.prevButton)} aria-label="Previous image">
                    <Image src={arrowIcon} alt="Previous" width={24} height={24} />
                </button>
                <button className={clsx(styles.navButton, styles.nextButton)} aria-label="Next image">
                    <Image src={arrowIcon} alt="Next" width={24} height={24} />
                </button>
            </div>

            {/* Bottom Tags */}
            <div className={styles.imageTags}>
                <span className={styles.tagAuthor}>Author: Jose Rodriguez</span>
                <span className={styles.tagType}>CNC routing by Wattsan</span>
            </div>
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
