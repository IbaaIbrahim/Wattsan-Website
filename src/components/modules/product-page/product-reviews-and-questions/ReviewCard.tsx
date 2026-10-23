import { FC } from 'react'
import Image from 'next/image'
import RatingStars from '@components/ui/rating-stars/RatingStars'
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
    const sections = [
        { title: 'Advantages', text: review.advantages },
        { title: 'Disadvantages', text: review.disadvantages },
        { title: 'Opinion', text: review.opinion }
    ].filter(section => section.text)

    return (
        <article className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
                <div className={styles.avatar}>
                    {review.author.avatar ? (
                        <Image src={review.author.avatar} alt={review.author.name} width={48} height={48} style={{ objectFit: 'cover' }} />
                    ) : (
                        <div />
                    )}
                </div>
                <div className={styles.headerInfo}>
                    <p className={styles.authorName}>
                        {review.author.name}
                    </p>
                    <div className={styles.ratingRow}>
                        <RatingStars rating={review.rating} size={16} color='#000000' gap={4} />
                        <span className={styles.date}>{review.date}</span>
                    </div>
                </div>
            </div>

            {sections.map(section => (
                <div key={section.title} className={styles.reviewSection}>
                    <p className={styles.sectionTitle}>
                        {section.title}
                    </p>
                    <p className={styles.sectionText}>
                        {section.text}
                    </p>
                </div>
            ))}

            {review.images && review.images.length > 0 && (
                <div className={styles.reviewImages}>
                    {review.images.map((img, index) => (
                        <div key={index} className={styles.imageThumb}>
                            <Image src={img} alt={`Review image ${index + 1}`} width={100} height={100} style={{ objectFit: 'cover' }} />
                        </div>
                    ))}
                    {review.images.length > 2 && (
                        <div className={styles.moreThumb}>
                            <span>+{review.images.length - 2}</span>
                        </div>
                    )}
                </div>
            )}
        </article>
    )
}

export default ReviewCard
