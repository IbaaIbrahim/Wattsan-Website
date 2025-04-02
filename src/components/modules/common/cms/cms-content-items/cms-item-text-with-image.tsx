import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';

import styles from './cms-item-text-with-image.module.scss'
import Image from 'next/image'

const CmsItemEditor: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>
				{contentItemData?.data?.title}
			</h3>
			<div className={styles.content}>
				<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentItemData?.data?.text) }} />
				<Image className={styles.image} width={200} height={200} src={contentItemData?.data?.file?.url} alt={contentItemData?.data?.file?.alt} />
			</div>
		</div>
	)
}

export default CmsItemEditor
