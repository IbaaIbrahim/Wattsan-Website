import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';
import clsx from 'clsx'

import styles from './cms-item-text-with-image.module.scss'
import './cms-item-text-with-image.module.scss'
import Image from 'next/image'

const CmsItemEditor: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<span style={{fontSize: 32, fontWeight: 500, marginBottom: '1rem'}} className={styles.title}>
				{contentItemData?.data?.title}
			</span>
			<div className={clsx(styles.content, 'cms-item-text-with-image-content-wrapper')} >
				<div style={{paddingRight: 30}} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentItemData?.data?.text) }} />
				<Image style={{borderRadius: 10}} className={clsx(styles.image, 'cms-item-text-with-image-content-image')} width={200} height={200} src={contentItemData?.data?.file?.url} alt={contentItemData?.data?.file?.alt} />
			</div>
		</div>
	)
}

export default CmsItemEditor
