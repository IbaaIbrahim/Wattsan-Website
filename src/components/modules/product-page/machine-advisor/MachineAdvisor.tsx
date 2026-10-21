'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ContactSection from '@components/modules/common/contact-section/ContactSection'
import { MachineAdvisorData } from '@/types/product'
import styles from './MachineAdvisor.module.scss'

const VideoPlayer = dynamic(() => import('@components/ui/video-player/VideoPlayer'), {
    ssr: false
})

export interface MachineAdvisorProps {
    data?: MachineAdvisorData
    className?: string
    onVideoClick?: (url: string) => void
}

const MachineAdvisor: FC<MachineAdvisorProps> = ({ data, className, onVideoClick }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    const title = data?.title || 'Not sure which machine is right for you?'
    const imageSrc = data?.image || '/product-cards/cnc-router/contact/image_222.png'
    const videoUrl = data?.videoUrl || ''

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsVideoOpen(false)
            }
        }
        if (isVideoOpen) {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isVideoOpen])

    const handlePlayClick = () => {
        if (onVideoClick && videoUrl) {
            onVideoClick(videoUrl)
            return
        }
        if (videoUrl) {
            setIsVideoOpen(true)
        }
    }

    const renderLeftContent = () => (
        <div className={styles.videoWrapper} onClick={handlePlayClick}>
            <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 968px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
            />
            <button
                type="button"
                className={styles.playButton}
                aria-label="Play video"
                onClick={(e) => {
                    e.stopPropagation()
                    handlePlayClick()
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.playIcon}
                >
                    <path d="M7 5V19L18 12L7 5Z" fill="white" />
                </svg>
            </button>
        </div>
    )

    return (
        <>
            <ContactSection
                title={title}
                leftContent={renderLeftContent()}
                className={className}
            />

            {isVideoOpen && videoUrl && (
                <div
                    className={styles.videoOverlay}
                    onClick={() => setIsVideoOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Advisor video player"
                >
                    <div className={styles.videoModalWrapper} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setIsVideoOpen(false)}
                            aria-label="Close video"
                        >
                            &times;
                        </button>
                        <VideoPlayer videoSrc={videoUrl} autoPlay={true} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MachineAdvisor
