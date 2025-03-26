import arrowTopRight from '@public/img/icons/arrow-top-right.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './LearningLink.module.scss'

const LearningLink: FC<{ url: string; title: string; subtitle: string }> = ({
	url,
	title,
	subtitle
}) => {
	return (
		<a
			href={url}
			className={styles.link}
		>
			<div className={styles.title}>{title}</div>
			<div className={styles.subtitle}>{subtitle}</div>
			<div className={styles.icon}>
				<Image
					src={arrowTopRight}
					alt=''
				/>
			</div>
		</a>
	)
}

export default LearningLink
