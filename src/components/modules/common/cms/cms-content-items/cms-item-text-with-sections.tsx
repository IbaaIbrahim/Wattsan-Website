import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';

import styles from './cms-item-text-with-sections.module.scss'
import Image from 'next/image'
import _ from 'lodash'

const CmsItemTextWithSections: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>
				{contentItemData?.data?.title}
			</h3>
			<div className={styles.content}>
				<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentItemData?.data?.text) }} />
			</div>
			<div className={styles.table}>
				{
					_.map(contentItemData?.data?.data, tableItem =>{
						return (
							<div className={styles.repeatedWrapper} key={tableItem.uuid}>
								<div className={styles.repeatedTitle}>{tableItem.title}</div>
								<div className={styles.repeatedText}>{tableItem.text}</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default CmsItemTextWithSections
