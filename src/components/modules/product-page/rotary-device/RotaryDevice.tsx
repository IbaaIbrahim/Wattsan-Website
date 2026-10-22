'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './RotaryDevice.module.scss'

export interface RotaryDeviceSpec {
    value: string
    label: string
}

interface RotaryDeviceProps {
    subtitle?: string
    title?: ReactNode
    description?: ReactNode
    specs?: RotaryDeviceSpec[]
    image?: string
    className?: string
}

const DEFAULT_SUBTITLE = 'WATTSAN RD Rotary Device'
const DEFAULT_TITLE = 'Precision Multi-Sided Machining with Integrated Fourth Axis'
const DEFAULT_DESCRIPTION =
    'The WATTSAN RD rotary device is an integrated fourth axis for CNC routers that enables automatic rotation of workpieces during milling. This allows multi-sided machining without manual repositioning, saving time and improving accuracy. It supports workpieces up to 2510 mm long, making it ideal for cylindrical and complex shaped parts. \nControlled via CNC, it synchronizes rotation with other axes for precise, repeatable operations. This feature boosts productivity and expands capabilities, perfect for furniture manufacturers and decorative element producers needing efficient multi-face processing.'
const DEFAULT_IMAGE = '/product-cards/cnc-router/rd-rotary/rd-r-1.png'
const DEFAULT_SPECS: RotaryDeviceSpec[] = [
    {
        value: '2510 mm',
        label: 'max long of workpieces'
    },
    {
        value: '300 mm',
        label: 'max working diameter'
    }
]

const renderHeading = (subtitle?: string, titleNode?: ReactNode) => {
    if (!titleNode && !subtitle) {
        return (
            <>
                <span className={styles.redHighlight}>{DEFAULT_SUBTITLE}</span> {DEFAULT_TITLE}
            </>
        )
    }

    if (typeof titleNode !== 'string') {
        return (
            <>
                {subtitle && <span className={styles.redHighlight}>{subtitle} </span>}
                {titleNode}
            </>
        )
    }

    if (titleNode.includes('<span')) {
        return (
            <>
                {subtitle && <span className={styles.redHighlight}>{subtitle} </span>}
                <span dangerouslySetInnerHTML={{ __html: titleNode }} />
            </>
        )
    }

    if (subtitle) {
        const cleanTitle = titleNode.trim().toLowerCase().startsWith(subtitle.trim().toLowerCase())
            ? titleNode.trim().slice(subtitle.trim().length).trim()
            : titleNode.trim()

        return (
            <>
                <span className={styles.redHighlight}>{subtitle}</span>
                {cleanTitle ? ` ${cleanTitle}` : ''}
            </>
        )
    }

    const match = titleNode.match(/^(WATTSAN\s+RD(?:\s+Rotary\s+Device)?)(.*)$/i)
    if (match) {
        return (
            <>
                <span className={styles.redHighlight}>{match[1]}</span>
                {match[2]}
            </>
        )
    }

    return titleNode
}

const RotaryDevice: FC<RotaryDeviceProps> = ({
    subtitle,
    title,
    description = DEFAULT_DESCRIPTION,
    specs = DEFAULT_SPECS,
    image = DEFAULT_IMAGE,
    className
}) => {
    const finalSpecs = specs && specs.length > 0 ? specs : DEFAULT_SPECS
    const finalDescription = description || DEFAULT_DESCRIPTION
    const finalImage = image || DEFAULT_IMAGE

    return (
        <section className={clsx(styles.rotaryDevice, className)}>
            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <Typography tag='h2' size='xxl' weight='bold' className={styles.title}>
                        {renderHeading(subtitle, title)}
                    </Typography>

                    <div className={styles.description}>
                        {typeof finalDescription === 'string' ? (
                            finalDescription.includes('<p') ||
                            finalDescription.includes('<br') ||
                            finalDescription.includes('<div') ? (
                                <div dangerouslySetInnerHTML={{ __html: finalDescription }} />
                            ) : (
                                finalDescription
                                    .split('\n')
                                    .filter(Boolean)
                                    .map((para, index) => <p key={index}>{para}</p>)
                            )
                        ) : (
                            finalDescription
                        )}
                    </div>

                    {finalSpecs.length > 0 && (
                        <div className={styles.specs}>
                            {finalSpecs.map((spec, index) => (
                                <div key={index} className={styles.specItem}>
                                    <Typography tag='h3' size='xl' weight='bold' className={styles.specValue}>
                                        {spec.value}
                                    </Typography>
                                    <Typography tag='p' size='s' weight='regular' className={styles.specLabel}>
                                        {spec.label}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={finalImage}
                            alt="Rotary Device Illustration"
                            width={1063}
                            height={600}
                            className={styles.image}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RotaryDevice
