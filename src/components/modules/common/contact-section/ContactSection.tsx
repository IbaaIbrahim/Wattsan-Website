import { FC, useState, ReactNode } from 'react'
import clsx from 'clsx'
import Checkbox, { Type as CheckboxType } from '@components/ui/checkbox/Checkbox'
import styles from './ContactSection.module.scss'

export interface ContactSectionProps {
    title: string
    leftContent: ReactNode
    className?: string
    onFormSubmit?: (data: any) => void
}

const ContactSection: FC<ContactSectionProps> = ({ title, leftContent, className, onFormSubmit }) => {
    const [activeFilter, setActiveFilter] = useState('Online demo')
    const [subscribe, setSubscribe] = useState(false)
    const [agree, setAgree] = useState(false)

    const filters = ['Online demo', 'Video', 'Exhibitions', 'Showrooms', 'Productions']

    return (
        <section className={clsx(styles.section, className)}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    {leftContent}
                </div>

                <div className={styles.formColumn}>
                    <h2 className={styles.formTitle}>
                        {title}
                    </h2>

                    <div className={styles.formCard}>
                        {/* Filters */}
                        <div className={styles.filters}>
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    className={clsx(styles.filterTag, activeFilter === filter && styles.active)}
                                    onClick={() => setActiveFilter(filter)}
                                    type="button"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Inputs */}
                        <form className={styles.formFields} onSubmit={(e) => {
                            e.preventDefault()
                            onFormSubmit?.({ activeFilter, subscribe, agree })
                        }}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input type="text" placeholder="Enter your Full Name" className={styles.input} />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone</label>
                                <div className={styles.phoneInputWrapper}>
                                    <div className={styles.flagSelect}>
                                        🇬🇧 ▾
                                    </div>
                                    <input type="tel" placeholder="Enter your phone number" className={styles.phoneInput} />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>E-mail</label>
                                <input type="email" placeholder="Enter your e-mail address" className={styles.input} />
                            </div>

                            {/* Checkboxes */}
                            <div className={styles.checkboxes}>
                                <Checkbox
                                    label="Subscribe to receive news and exclusive offers"
                                    selected={subscribe}
                                    type={CheckboxType.CATEGORY}
                                    onSelect={() => setSubscribe(!subscribe)}
                                />
                                <Checkbox
                                    label="Agree to privacy policy and personal data processing"
                                    selected={agree}
                                    type={CheckboxType.CATEGORY}
                                    onSelect={() => setAgree(!agree)}
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Get in touch
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
