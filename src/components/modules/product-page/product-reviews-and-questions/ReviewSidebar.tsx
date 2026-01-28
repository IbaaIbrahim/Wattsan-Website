import { FC, useState } from 'react'
import Button from '@components/ui/button/Button'
import Checkbox, { Type } from '@components/ui/checkbox/Checkbox'
import RatingStars from '@components/ui/rating-stars/RatingStars'
import { Typography } from '@components/ui/typography/Typography'
import styles from './ProductReviewsAndQuestions.module.scss'

interface ReviewSidebarProps {
    rating: number
    reviewCount: number
    ratingBreakdown: {
        stars: number
        count: number | string
    }[]
}

const ReviewSidebar: FC<ReviewSidebarProps> = ({ rating, reviewCount, ratingBreakdown }) => {
    const [selectedStars, setSelectedStars] = useState<number[]>([])

    const toggleStar = (stars: number) => {
        setSelectedStars(prev =>
            prev.includes(stars) ? prev.filter(s => s !== stars) : [...prev, stars]
        )
    }

    return (
        <aside className={styles.sidebar}>
            <Button view='red' size='l' block className={styles.leaveReviewBtn}>
                Leave a review
            </Button>

            <div className={styles.evaluationSummary}>
                <div className={styles.summaryHeader}>
                    <Typography tag='p' size='l' weight='semi-bold'>
                        Evaluation {rating.toFixed(1)} ★
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.basedOn}>
                        Based on {reviewCount} reviews
                    </Typography>
                </div>

                <div className={styles.ratingBreakdown}>
                    {ratingBreakdown.map((item) => (
                        <div key={item.stars} className={styles.breakdownItem}>
                            <Checkbox
                                selected={selectedStars.includes(item.stars)}
                                type={Type.CATEGORY}
                                onSelect={() => toggleStar(item.stars)}
                            />
                            <RatingStars rating={item.stars} size={14} />
                            <span className={styles.breakdownCount}>{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default ReviewSidebar
