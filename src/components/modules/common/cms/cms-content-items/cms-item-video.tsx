import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';

import styles from './cms-item-video.module.scss'
import Image from 'next/image'

const CmsItemVideo: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>
				{contentItemData?.data?.title}
			</h3>
			<div className={styles.content}>
				<video className={styles.video} width="100%" controls>
					<source src={contentItemData?.data?.file?.url} />
				</video>
			</div>
		</div>
	)
}

export default CmsItemVideo
