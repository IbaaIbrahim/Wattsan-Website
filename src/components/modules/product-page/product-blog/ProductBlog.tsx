'use client'

import { FC } from 'react'
import Image from 'next/image'
import Button from '@components/ui/button/Button'
import styles from './ProductBlog.module.scss'

export interface BlogCardData {
    id: string
    tag: string
    title: string
    description: string
    imageUrl?: string
    href: string
}

interface ProductBlogProps {
    className?: string
    articles?: BlogCardData[]
}

const BlogCard: FC<{ article: BlogCardData }> = ({ article }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {article.imageUrl ? (
                    <Image src={article.imageUrl} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                    <div className={styles.placeholder} />
                )}
            </div>
            <div className={styles.tag}>{article.tag}</div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardDescription}>{article.description}</p>
            </div>
            <Button
                view="black"
                className={styles.button}
                href={article.href}
            >
                View details
            </Button>
        </div>
    )
}

const ProductBlog: FC<ProductBlogProps> = ({ className, articles: initialArticles }) => {
    const defaultArticles: BlogCardData[] = [
        {
            id: '1',
            tag: 'Event',
            title: 'Invitation to online masterclass on laser cutting',
            description: 'Join our online masterclass dedicated to using the Laser Cutting Engraving Machine 0503. Gain exclusive insights from professionals in the field of laser cutting.',
            href: '/blog/masterclass',
            // imageUrl: '/img/blog/masterclass.jpg' // Placeholder
        },
        {
            id: '2',
            tag: 'Software',
            title: 'Updated software for Laser cutting engraving machine 0503',
            description: 'Download the latest software update for your Laser Cutting Engraving Machine 0503 model. Enhance the capabilities of your equipment.',
            href: '/blog/software-update',
        },
        {
            id: '3',
            tag: 'Education',
            title: 'Unlimited access to manuals and instructions',
            description: 'Enjoy unlimited access to our comprehensive manuals and instructions tailored for your equipment.',
            href: '/blog/manuals',
        }
    ]

    const articles = initialArticles || defaultArticles

    return (
        <section className={`${styles.section} ${className || ''}`}>
            <h2 className={styles.title}>
                <span className={styles.titleHighlight}>Blog</span> about technology and manufacturing
            </h2>
            <div className={styles.grid}>
                {articles.map((article) => (
                    <BlogCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    )
}

export default ProductBlog
