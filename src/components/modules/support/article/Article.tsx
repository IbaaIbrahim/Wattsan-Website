import styles from './Article.module.scss'

const classByType = {
	header: styles.header,
	title: styles.title,
	paragraph: styles.paragraph
}

const Article = ({ article }) => {
	const content = article.reduce((acc, { type, text }, index) => {
		return [
			...acc,
			<div
				key={index}
				className={classByType[type]}
			>
				{Array.isArray(text)
					? text.map((text, index) => (
							<div
								key={index}
								className={styles.subparagraph}
							>
								{text}
							</div>
						))
					: text}
			</div>
		]
	}, [])

	return <div>{content.map(item => item)}</div>
}

export default Article
