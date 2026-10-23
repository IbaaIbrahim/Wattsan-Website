'use client'

import { FC, Fragment, useState } from 'react'
import clsx from 'clsx'
import ReviewCard, { IReview } from './ReviewCard'
import ReviewSidebar from './ReviewSidebar'
import styles from './ProductReviewsAndQuestions.module.scss'

interface ProductReviewsAndQuestionsProps {
    className?: string
}

const SortArrowIcon = () => (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M8 3V13M8 13L3.5 8.5M8 13L12.5 8.5'
            stroke='#000000'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

const CheckIcon = () => (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M2.5 7.5L5.5 10.5L11.5 3.5'
            stroke='#FFFFFF'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
)

const ProductReviewsAndQuestions: FC<ProductReviewsAndQuestionsProps> = ({ className }) => {
    const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews')
    const [sortBy, setSortBy] = useState<'date' | 'evaluation'>('date')
    const [withPhoto, setWithPhoto] = useState(false)
    const [withVideo, setWithVideo] = useState(false)

    const reviews: IReview[] = [
        {
            id: '1',
            author: {
                name: 'Heinrich Schüür',
                avatar: ''
            },
            rating: 5,
            date: '22.01.2024',
            advantages: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            disadvantages: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            opinion: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            images: [
                '/img/catalog/cnc-routes.png',
                '/img/catalog/cnc-routes.png',
                '/img/catalog/cnc-routes.png',
                '/img/catalog/cnc-routes.png',
                '/img/catalog/cnc-routes.png'
            ]
        },
        {
            id: '2',
            author: {
                name: 'Heinrich Schüür',
                avatar: ''
            },
            rating: 5,
            date: '22.01.2024',
            advantages: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            disadvantages: '',
            opinion: '',
        }
    ]

    const ratingBreakdown = [
        { stars: 5, count: '10 reviews' },
        { stars: 4, count: 'none' },
        { stars: 3, count: 'none' },
        { stars: 2, count: 'none' },
        { stars: 1, count: 'none' }
    ]

    return (
        <section className={clsx(styles.section, className)}>
            <h2 className={styles.sectionTitle}>
                <span className={styles.redText}>Reviews</span> and questions
            </h2>

            <div className={styles.tabs}>
                <button
                    className={clsx(styles.tab, activeTab === 'reviews' && styles.active)}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews&nbsp;<span className={styles.tabCount}>(10)</span>
                </button>
                <button
                    className={clsx(styles.tab, activeTab === 'questions' && styles.active)}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions&nbsp;<span className={styles.tabCount}>(21)</span>
                </button>
            </div>

            <div className={styles.filtersBar}>
                <span className={styles.filterLabel}>Sort by:</span>
                <button
                    className={clsx(styles.sortBtn, sortBy === 'date' && styles.active)}
                    onClick={() => setSortBy('date')}
                >
                    Date
                    {sortBy === 'date' && <SortArrowIcon />}
                </button>
                <button
                    className={clsx(styles.sortBtn, sortBy === 'evaluation' && styles.active)}
                    onClick={() => setSortBy('evaluation')}
                >
                    Evaluation
                    {sortBy === 'evaluation' && <SortArrowIcon />}
                </button>

                <label className={styles.filterCheck}>
                    <input
                        className={styles.filterCheckInput}
                        type='checkbox'
                        checked={withPhoto}
                        onChange={() => setWithPhoto(!withPhoto)}
                    />
                    <span className={styles.filterCheckBox}>
                        <CheckIcon />
                    </span>
                    <span className={styles.filterCheckLabel}>With photo</span>
                </label>

                <label className={styles.filterCheck}>
                    <input
                        className={styles.filterCheckInput}
                        type='checkbox'
                        checked={withVideo}
                        onChange={() => setWithVideo(!withVideo)}
                    />
                    <span className={styles.filterCheckBox}>
                        <CheckIcon />
                    </span>
                    <span className={styles.filterCheckLabel}>With video</span>
                </label>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.reviewsList}>
                    {reviews.map((review, index) => (
                        <Fragment key={review.id}>
                            {index > 0 && <div className={styles.divider} />}
                            <ReviewCard review={review} />
                        </Fragment>
                    ))}
                    <button className={styles.viewMoreBtn}>
                        View more reviews
                    </button>
                </div>

                <div className={styles.sidebar}>
                    <ReviewSidebar
                        rating={5.0}
                        reviewCount={10}
                        ratingBreakdown={ratingBreakdown}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductReviewsAndQuestions
