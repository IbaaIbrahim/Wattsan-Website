'use client'

import { FC } from 'react'
import Image from 'next/image'
import Button from '@components/ui/button/Button'
import styles from './ProductBlog.module.scss'

export interface BlogCardData {
    id: string
    tag?: string
    categories?: string | string[]
    title?: string
    description?: string
    content?: string
    imageUrl?: string
    videoUrl?: string
    href: string
}

interface ProductBlogProps {
    className?: string
    articles?: BlogCardData[]
}

const isVideoUrl = (url?: string): boolean => {
    if (!url || typeof url !== 'string') return false
    const cleanUrl = url.split('?')[0].toLowerCase()
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.avi', '.mkv']
    if (videoExtensions.some((ext) => cleanUrl.endsWith(ext))) {
        return true
    }
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be') || cleanUrl.includes('vimeo.com')) {
        return true
    }
    return false
}

const BlogCard: FC<{ article: BlogCardData }> = ({ article }) => {
    const mediaSrc = article.videoUrl || article.imageUrl
    const isVideo = isVideoUrl(mediaSrc)

    const isExternal = article.href ? /^(https?:\/\/|\/\/)/i.test(article.href) : false
    const isConfiguredHost = typeof mediaSrc === 'string' && (
        mediaSrc.startsWith('/') ||
        mediaSrc.includes('wattsan.com') ||
        mediaSrc.includes('api.wattsancnc.com')
    )

    const categoriesList: string[] = Array.isArray(article.categories)
        ? article.categories
        : typeof article.categories === 'string'
        ? article.categories.split(',').map((c) => c.trim()).filter(Boolean)
        : article.tag
        ? [article.tag]
        : []

    const textContent = article.content || article.description

    return (
        <div className={styles.card}>
            <div className={styles.contentWrapper}>
                <div className={styles.imageWrapper}>
                    {isVideo && mediaSrc ? (
                        <video
                            src={mediaSrc}
                            controls
                            playsInline
                            preload="metadata"
                            className={styles.video}
                        />
                    ) : mediaSrc ? (
                        <Image
                            src={mediaSrc}
                            alt={article.title || 'Blog article'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            unoptimized={Boolean(mediaSrc.startsWith('http') && !isConfiguredHost)}
                        />
                    ) : (
                        <div className={styles.placeholder} />
                    )}
                </div>

                {categoriesList.length > 0 ? (
                    <div className={styles.tagsWrapper}>
                        {categoriesList.map((cat, idx) => (
                            <div key={idx} className={styles.tag}>{cat}</div>
                        ))}
                    </div>
                ) : null}

                {(article.title || textContent) && (
                    <div className={styles.cardContent}>
                        {article.title ? <h3 className={styles.cardTitle}>{article.title}</h3> : null}
                        {textContent ? (
                            <div
                                className={styles.cardDescription}
                                dangerouslySetInnerHTML={{ __html: textContent }}
                            />
                        ) : null}
                    </div>
                )}
            </div>

            <Button
                view="black"
                className={styles.button}
                href={article.href || '#'}
                target={isExternal ? '_blank' : undefined}
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
            href: '/blog/masterclass'
        },
        {
            id: '2',
            tag: 'Software',
            title: 'Updated software for Laser cutting engraving machine 0503',
            description: 'Download the latest software update for your Laser Cutting Engraving Machine 0503 model. Enhance the capabilities of your equipment.',
            href: '/blog/software-update'
        },
        {
            id: '3',
            tag: 'Education',
            title: 'Unlimited access to manuals and instructions',
            description: 'Enjoy unlimited access to our comprehensive manuals and instructions tailored for your equipment.',
            href: '/blog/manuals'
        }
    ]

    const articles = initialArticles && initialArticles.length > 0 ? initialArticles : defaultArticles

    if (!articles || articles.length === 0) {
        return null
    }

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
