import { FC, useState } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { HeartOfTheMachineryData } from '@my-types/product'

import styles from './HeartOfTheMachinery.module.scss'

interface HeartOfTheMachineryProps {
    className?: string
    data: HeartOfTheMachineryData
}

const HeartOfTheMachinery: FC<HeartOfTheMachineryProps> = ({ className, data }) => {
    const [activeTab, setActiveTab] = useState(data.tabs[0].id)
    const activeContent = data.content[activeTab]

    return (
        <div className={clsx(styles.container, className)}>
            <Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
                <span className={styles.redText}>Heart</span> of the machinery
            </Typography>

            <div className={styles.contentWrapper}>
                <div className={styles.tabs}>
                    {data.tabs.map((tab) => (
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
