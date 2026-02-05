import { FC } from 'react'
import Image from 'next/image'
import ContactSection from '@components/modules/common/contact-section/ContactSection'
import styles from './MachineAdvisor.module.scss'

interface MachineAdvisorProps {
    className?: string
}

const MachineAdvisor: FC<MachineAdvisorProps> = ({ className }) => {
    const renderLeftContent = () => (
        <div className={styles.videoWrapper}>
            <Image
                src="/product-cards/cnc-router/contact/image_222.png"
                alt="Machine selection advisor"
                fill
                style={{ objectFit: 'cover' }}
            />
            <div className={styles.playButton}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 6V18L17 12L7 6Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )

    return (
        <ContactSection
            title="Not sure which machine is right for you?"
            leftContent={renderLeftContent()}
            className={className}
        />
    )
}

export default MachineAdvisor
