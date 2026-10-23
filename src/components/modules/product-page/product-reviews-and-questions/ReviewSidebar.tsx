import { FC, useState } from 'react'
import Button from '@components/ui/button/Button'
import RatingStars from '@components/ui/rating-stars/RatingStars'
import styles from './ProductReviewsAndQuestions.module.scss'

interface ReviewSidebarProps {
    rating: number
    reviewCount: number
    ratingBreakdown: {
        stars: number
        count: number | string
    }[]
}

const StarIcon = () => (
    <svg
        className={styles.summaryStar}
        width='24'
        height='24'
        viewBox='0 0 16 16'
        fill='#000000'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path d='M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z' />
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

const ReviewSidebar: FC<ReviewSidebarProps> = ({ rating, reviewCount, ratingBreakdown }) => {
    const [selectedStars, setSelectedStars] = useState<number[]>([])

    const toggleStar = (stars: number) => {
        setSelectedStars(prev =>
            prev.includes(stars) ? prev.filter(s => s !== stars) : [...prev, stars]
        )
    }

    return (
        <aside className={styles.sidebarCard}>
            <Button view='black' size='l' block className={styles.leaveReviewBtn}>
                Leave a review
            </Button>

            <div className={styles.evaluationSummary}>
                <div className={styles.summaryRow}>
                    <p className={styles.summaryTitle}>
                        Evaluation {rating.toFixed(1)}
                    </p>
                    <StarIcon />
                </div>
                <p className={styles.basedOn}>
                    Based on {reviewCount} reviews
                </p>
            </div>

            <div className={styles.ratingBreakdown}>
                {ratingBreakdown.map(item => (
                    <label key={item.stars} className={styles.breakdownRow}>
                        <input
                            className={styles.filterCheckInput}
                            type='checkbox'
                            checked={selectedStars.includes(item.stars)}
                            onChange={() => toggleStar(item.stars)}
                        />
                        <span className={styles.filterCheckBox}>
                            <CheckIcon />
                        </span>
                        <RatingStars rating={item.stars} size={16} color='#000000' gap={4} />
                        <span className={styles.breakdownCount}>{item.count}</span>
                    </label>
                ))}
            </div>
        </aside>
    )
}

export default ReviewSidebar
