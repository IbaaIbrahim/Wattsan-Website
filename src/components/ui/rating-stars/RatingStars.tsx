import { FC } from 'react'
import clsx from 'clsx'
import styles from './RatingStars.module.scss'

interface RatingStarsProps {
    rating: number
    max?: number
    size?: number
    className?: string
}

const RatingStars: FC<RatingStarsProps> = ({ rating, max = 5, size = 16, className }) => {
    return (
        <div className={clsx(styles.stars, className)}>
            {[...Array(max)].map((_, i) => (
                <svg
                    key={i}
                    width={size}
                    height={size}
                    viewBox='0 0 16 16'
                    fill={i < Math.floor(rating) ? '#FFD700' : '#E0E0E0'}
                >
                    <path d='M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z' />
                </svg>
            ))}
        </div>
    )
}

export default RatingStars
