import { FC, useState } from 'react'
import clsx from 'clsx'
import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import styles from './FAQ.module.scss'

interface FAQItem {
    id: string
    question: string
    answer: string
}

interface FAQProps {
    items?: FAQItem[]
    className?: string
}

const FAQ: FC<FAQProps> = ({ items = [], className }) => {
    const [openItems, setOpenItems] = useState<string[]>(['1']) // Default first item open as in screenshot

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
                        <Typography tag='h2' size='xl' weight='semi-bold' className={styles.title}>
                            FAQ
                        </Typography>
                        <Typography tag='p' size='s' weight='regular' className={styles.description}>
                            If you don't find the answer to your question, please visit our support section where you can contact our support team after registering.
                        </Typography>
                        <Button view='bordered' size='m' className={styles.supportBtn}>
                            Support section
                        </Button>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.accordion}>
                            {displayItems.map((item) => {
                                const isOpen = openItems.includes(item.id)
                                return (
                                    <div key={item.id} className={clsx(styles.accordionItem, isOpen && styles.isOpen)}>
                                        <button
                                            className={styles.accordionHeader}
                                            onClick={() => toggleItem(item.id)}
                                            aria-expanded={isOpen}
                                        >
                                            <Typography tag='p' size='m' weight='semi-bold' className={styles.question}>
                                                {item.question}
                                            </Typography>
                                            <span className={styles.icon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div className={styles.accordionContent}>
                                            <div className={styles.contentInner}>
                                                <Typography tag='p' size='s' weight='regular' className={styles.answer}>
                                                    {item.answer}
                                                </Typography>
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
