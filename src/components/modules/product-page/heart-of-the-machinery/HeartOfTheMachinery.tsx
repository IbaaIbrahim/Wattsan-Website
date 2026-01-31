'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './HeartOfTheMachinery.module.scss'

interface DetailItem {
    label: string
    value: string
}

interface MachineTabContent {
    id: string
    title: string
    description: string
    details: DetailItem[]
    image: string
}

interface HeartOfTheMachineryProps {
    className?: string
}

const tabs: { id: string; label: string }[] = [
    { id: 'spindle', label: 'Spindle' },
    { id: 'worktable', label: 'Worktable' },
    { id: 'controlSystem', label: 'Control system' }
]

const content: Record<string, MachineTabContent> = {
    spindle: {
        id: 'spindle',
        title: 'Powerful spindle with upgrade option',
        description: 'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment. We can therefore guarantee reliability and a long service life.',
        details: [
            { label: 'Power', value: 'from 2,2 kW' },
            { label: 'Z axis travel', value: '300 mm' }
        ],
        image: '/img/catalog/cnc-routes.png' // Using existing placeholder for now
    },
    worktable: {
        id: 'worktable',
        title: 'Reliable Worktable',
        description: 'Vacuum table with T-slots allows you to fix the material both with clamps and vacuum.',
        details: [
            { label: 'Type', value: 'Vacuum + T-slots' },
            { label: 'Zones', value: '4-6 zones' }
        ],
        image: '/img/catalog/cnc-routes.png' // Using existing placeholder for now
    },
    controlSystem: {
        id: 'controlSystem',
        title: 'Advanced Control System',
        description: 'Easy to learn and operate control system with wide compatibility.',
        details: [
            { label: 'System', value: 'DSP A11' },
            { label: 'Compatibility', value: 'Win/Mac/Linux' }
        ],
        image: '/img/catalog/cnc-routes.png' // Using existing placeholder for now
    }
}

const HeartOfTheMachinery: FC<HeartOfTheMachineryProps> = ({ className }) => {
    const [activeTab, setActiveTab] = useState('spindle')
    const activeContent = content[activeTab]

    return (
        <div className={clsx(styles.container, className)}>
            <Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
                <span className={styles.redText}>Heart</span> of the machinery
            </Typography>

            <div className={styles.contentWrapper}>
                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Typography tag='span' size='s' weight='semi-bold'>
                                {tab.label}
                            </Typography>
                        </button>
                    ))}
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.textContent}>
                        <Typography tag='h3' size='xl' weight='bold' className={styles.contentTitle}>
                            {activeContent.title}
                        </Typography>
                        <Typography tag='p' size='m' weight='regular' className={styles.contentDescription}>
                            {activeContent.description}
                        </Typography>

                        <div className={styles.details}>
                            {activeContent.details.map((detail, index) => (
                                <div key={index} className={styles.detailItem}>
                                    <Typography tag='span' size='l' weight='bold' className={styles.detailValue}>
                                        {detail.value}
                                    </Typography>
                                    <div className={styles.detailLine} />
                                    <Typography tag='span' size='xs' weight='regular' className={styles.detailLabel}>
                                        {detail.label}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.imageContent}>
                        <Image
                            src={activeContent.image}
                            alt={activeContent.title}
                            width={500}
                            height={500}
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeartOfTheMachinery
