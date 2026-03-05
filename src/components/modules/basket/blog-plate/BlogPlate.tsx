import Button from '@components/ui/button/Button'
import { TOrderInfo } from '@my-types/basket'
import Image from 'next/image'
import { FC } from 'react'

import styles from './BlogPlate.module.scss'

const BlogPlate: FC<{
	posts: TOrderInfo['blog']
}> = ({ posts }) => {
	return (
		<div className={styles.plate}>
			{posts.map(post => (
				<div key={post.url}>
					<div className={styles.image}>
						<Image
							src={post.image}
							fill={true}
							alt=''
							objectFit='contain'
						/>
					</div>
					<div>
						{
							post.tags?.map((tag: string) => (
								<div key={tag} className={styles.tag}>{tag}</div>
							))
						}
					</div>
					<div className={styles.title}>{post.title}</div>
					<div className={styles.subtitle}>{post.subtitle}</div>
					<Button
						className={styles.action}
						size='l'
						view='black'
						href={post.url}
						target='_blank'
					>
						Learn more
					</Button>
				</div>
			))}
		</div>
	)
}

export default BlogPlate
