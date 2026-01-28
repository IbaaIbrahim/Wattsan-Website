import { FC } from 'react'
import Image from 'next/image'
import RatingStars from '@components/ui/rating-stars/RatingStars'
import { Typography } from '@components/ui/typography/Typography'
import styles from './ProductReviewsAndQuestions.module.scss'

export interface IReview {
    id: string
    author: {
        name: string
        avatar?: string
    }
    rating: number
    date: string
    advantages: string
    disadvantages: string
    opinion: string
    images?: string[]
}

interface ReviewCardProps {
    review: IReview
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
                <div className={styles.avatar}>
                    {review.author.avatar ? (
                        <Image src={review.author.avatar} alt={review.author.name} width={40} height={40} />
                    ) : (
                        <div className={styles.avatarPlaceholder} />
                    )}
                </div>
                <div className={styles.headerInfo}>
                    <Typography tag='p' size='m' weight='semi-bold' className={styles.authorName}>
                        {review.author.name}
                    </Typography>
                    <div className={styles.ratingRow}>
                        <RatingStars rating={review.rating} size={14} />
                        <span className={styles.date}>{review.date}</span>
                    </div>
                </div>
            </div>

            <div className={styles.reviewContent}>
                <div className={styles.reviewSection}>
                    <Typography tag='p' size='s' weight='semi-bold' className={styles.sectionTitle}>
                        Advantages
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.sectionText}>
                        {review.advantages}
                    </Typography>
                </div>

                <div className={styles.reviewSection}>
                    <Typography tag='p' size='s' weight='semi-bold' className={styles.sectionTitle}>
                        Disadvantages
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.sectionText}>
                        {review.disadvantages}
                    </Typography>
                </div>

                <div className={styles.reviewSection}>
                    <Typography tag='p' size='s' weight='semi-bold' className={styles.sectionTitle}>
                        Opinion
                    </Typography>
                    <Typography tag='p' size='s' weight='regular' className={styles.sectionText}>
                        {review.opinion}
                    </Typography>
                </div>

                {review.images && review.images.length > 0 && (
                    <div className={styles.reviewImages}>
                        {review.images.map((img, index) => (
                            <div key={index} className={styles.imageThumb}>
                                <Image src={img} alt={`Review image ${index + 1}`} width={80} height={80} style={{ objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewCard
