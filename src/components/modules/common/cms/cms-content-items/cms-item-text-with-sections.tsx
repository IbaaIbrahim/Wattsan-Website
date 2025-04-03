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
					_.map(contentItemData?.data?.data, (tableItem, tableItemIndex) =>{
						return (
							<div style={{marginTop: tableItemIndex > 0 ? 20 : 0}} className={styles.repeatedWrapper} key={tableItem.uuid}>
								<div style={{paddingBottom: 7, fontWeight: 500}} className={styles.repeatedTitle}>{tableItem.title}</div>
								<div style={{paddingTop: 7}} className={styles.repeatedText}>{tableItem.text}</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default CmsItemTextWithSections
