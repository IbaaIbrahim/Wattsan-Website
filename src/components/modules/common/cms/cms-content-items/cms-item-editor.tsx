import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';

import styles from './cms-item-editor.module.scss'

const CmsItemEditor: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.parse(contentItemData?.data?.text)) }} />
	)
}

export default CmsItemEditor
