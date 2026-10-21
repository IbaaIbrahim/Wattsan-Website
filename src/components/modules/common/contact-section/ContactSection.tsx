'use client'

import { FC, useState, ReactNode } from 'react'
import clsx from 'clsx'
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
                        <form
                            className={styles.formFields}
                            onSubmit={(e) => {
                                e.preventDefault()
                                onFormSubmit?.({ activeFilter, subscribe, agree })
                            }}
                        >
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your Full Name"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone</label>
                                <div className={styles.phoneInputWrapper}>
                                    <div className={styles.flagSelect} title="United Kingdom (+44)">
                                        <svg
                                            width="24"
                                            height="16"
                                            viewBox="0 0 24 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={styles.flagIcon}
                                        >
                                            <rect width="24" height="16" rx="2" fill="#012169" />
                                            <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="3" />
                                            <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.8" />
                                            <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="5" />
                                            <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
                                        </svg>
                                        <svg
                                            width="12"
                                            height="8"
                                            viewBox="0 0 12 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={styles.chevronIcon}
                                        >
                                            <path
                                                d="M1 1.5L6 6.5L11 1.5"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className={styles.phoneInput}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>E-mail</label>
                                <input
                                    type="email"
                                    placeholder="Enter your e-mail address"
                                    className={styles.input}
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className={styles.checkboxes}>
                                <label className={styles.checkboxItem}>
                                    <input
                                        type="checkbox"
                                        checked={subscribe}
                                        onChange={() => setSubscribe(!subscribe)}
                                        className={styles.checkboxInput}
                                    />
                                    <span className={clsx(styles.checkboxBox, subscribe && styles.checked)}>
                                        {subscribe && (
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={styles.checkIcon}
                                            >
                                                <path
                                                    d="M16.3145 8.27246C16.7163 7.8938 17.3487 7.91269 17.7275 8.31445C18.1062 8.7163 18.0873 9.34873 17.6855 9.72754L11.3223 15.7275C10.937 16.0907 10.3354 16.0907 9.9502 15.7275L6.31445 12.2988C5.91267 11.92 5.89373 11.2876 6.27246 10.8857C6.65124 10.484 7.2837 10.4652 7.68555 10.8438L10.6367 13.626L16.3145 8.27246Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    <span className={styles.checkboxText}>
                                        Subscribe to receive news and exclusive offers
                                    </span>
                                </label>

                                <label className={styles.checkboxItem}>
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={() => setAgree(!agree)}
                                        className={styles.checkboxInput}
                                    />
                                    <span className={clsx(styles.checkboxBox, agree && styles.checked)}>
                                        {agree && (
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={styles.checkIcon}
                                            >
                                                <path
                                                    d="M16.3145 8.27246C16.7163 7.8938 17.3487 7.91269 17.7275 8.31445C18.1062 8.7163 18.0873 9.34873 17.6855 9.72754L11.3223 15.7275C10.937 16.0907 10.3354 16.0907 9.9502 15.7275L6.31445 12.2988C5.91267 11.92 5.89373 11.2876 6.27246 10.8857C6.65124 10.484 7.2837 10.4652 7.68555 10.8438L10.6367 13.626L16.3145 8.27246Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    <span className={styles.checkboxText}>
                                        Agree to privacy policy and personal data processing
                                    </span>
                                </label>
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
