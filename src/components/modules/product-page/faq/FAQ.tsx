'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { renderHighlightedTitle } from '@/utils/highlight-title'
import styles from './FAQ.module.scss'

export interface FAQItem {
    id: string
    question: string
    answer: string
}

export interface FAQProps {
    title?: string
    description?: string
    buttonText?: string
    buttonHref?: string
    items?: FAQItem[]
    className?: string
}

const FAQ: FC<FAQProps> = ({
    title = 'FAQ',
    description = "If you don't find the answer to your question, please visit our support section where you can contact our support team after registering.",
    buttonText = 'Support section',
    buttonHref = '/support',
    items = [],
    className
}) => {
    const defaultItems: FAQItem[] = [
        {
            id: '1',
            question: 'Software Installation & Safety',
            answer: 'We accept various payment methods, including bank cards, e-wallets and cashless payment. Choose the most convenient method for you when placing your order.'
        },
        {
            id: '2',
            question: 'What is the warranty period for the equipment?',
            answer: 'The standard warranty period for Wattsan equipment is 24 months from the date of delivery. Extended warranty options are also available.'
        },
        {
            id: '3',
            question: 'How are returns handled?',
            answer: 'Returns are handled according to our returns policy. If the product is found to be defective within the warranty period, we will repair or replace it at no extra cost.'
        },
        {
            id: '4',
            question: 'Do you provide training for users?',
            answer: 'Yes, we provide comprehensive offline and online training programs to ensure your team can operate the machine efficiently and safely.'
        },
        {
            id: '5',
            question: 'How can I order an expert visit?',
            answer: 'You can order an expert visit through our support section or by contacting your project manager directly.'
        },
        {
            id: '6',
            question: 'How do I access the full study content?',
            answer: 'Full study content is available for registered users in the support section of our website.'
        }
    ]

    const displayItems = items.length > 0 ? items : defaultItems
    const [openItems, setOpenItems] = useState<string[]>([displayItems[0]?.id || '1'])

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.leftCol}>
                        <h2 className={styles.title}>
                            {renderHighlightedTitle(title, styles.redText)}
                        </h2>
                        <p className={styles.description}>
                            {description}
                        </p>
                        {buttonHref && (
                            <Link href={buttonHref} className={styles.supportBtn}>
                                {buttonText}
                            </Link>
                        )}
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.accordion}>
                            {displayItems.map((item) => {
                                const isOpen = openItems.includes(item.id)
                                return (
                                    <div
                                        key={item.id}
                                        className={clsx(styles.accordionItem, isOpen && styles.isOpen)}
                                    >
                                        <button
                                            type='button'
                                            className={styles.accordionHeader}
                                            onClick={() => toggleItem(item.id)}
                                            aria-expanded={isOpen}
                                        >
                                            <p className={styles.question}>
                                                {item.question}
                                            </p>
                                            <span className={styles.icon}>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                        <div className={styles.accordionContent}>
                                            <div className={styles.contentInner}>
                                                <div
                                                    className={styles.answer}
                                                    dangerouslySetInnerHTML={{ __html: item.answer || '' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
