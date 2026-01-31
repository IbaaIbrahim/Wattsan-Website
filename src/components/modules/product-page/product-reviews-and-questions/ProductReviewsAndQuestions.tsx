'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import { Typography } from '@components/ui/typography/Typography'
import Checkbox, { Type } from '@components/ui/checkbox/Checkbox'
import ReviewCard, { IReview } from './ReviewCard'
import ReviewSidebar from './ReviewSidebar'
import styles from './ProductReviewsAndQuestions.module.scss'

interface ProductReviewsAndQuestionsProps {
    className?: string
}

const ProductReviewsAndQuestions: FC<ProductReviewsAndQuestionsProps> = ({ className }) => {
    const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews')
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
            <div className={styles.container}>
                <Typography tag='h2' size='xl' weight='semi-bold' className={styles.sectionTitle}>
                    <span className={styles.redText}>Reviews</span> and questions
                </Typography>

                <div className={styles.tabs}>
                    <button
                        className={clsx(styles.tab, activeTab === 'reviews' && styles.active)}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews <span className={styles.tabCount}>(10)</span>
                    </button>
                    <button
                        className={clsx(styles.tab, activeTab === 'questions' && styles.active)}
                        onClick={() => setActiveTab('questions')}
                    >
                        Questions <span className={styles.tabCount}>(21)</span>
                    </button>
                </div>

                <div className={styles.filtersBar}>
                    <div className={styles.leftFilters}>
                        <span className={styles.filterLabel}>Sort by:</span>
                        <button className={clsx(styles.sortBtn, styles.active)}>
                            Date ↓
                        </button>
                        <button className={styles.sortBtn}>
                            Evaluation
                        </button>
                    </div>
                    <div className={styles.rightFilters}>
                        <Checkbox
                            label='With photo'
                            selected={withPhoto}
                            type={Type.CATEGORY}
                            onSelect={() => setWithPhoto(!withPhoto)}
                        />
                        <Checkbox
                            label='With video'
                            selected={withVideo}
                            type={Type.CATEGORY}
                            onSelect={() => setWithVideo(!withVideo)}
                        />
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.reviewsList}>
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                        <button className={styles.viewMoreBtn}>
                            View more reviews
                        </button>
                    </div>

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
