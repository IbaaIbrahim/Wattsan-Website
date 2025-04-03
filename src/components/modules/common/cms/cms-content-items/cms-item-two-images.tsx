import PropTypes from 'prop-types';
import React, { FC } from 'react'
import _ from 'lodash'

import styles from './cms-item-two-images.module.scss'
import Image from 'next/image'

const CmsItemTwoImages: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.imageItemWrapper}>
					<Image style={{width: '100%', height: 230}} width={300} height={300} src={_.get(contentItemData, 'data.file1.url')} alt='' />
					<span style={{color: '#898989'}}>{_.get(contentItemData, 'data.text1')}</span>
				</div>
				<div className={styles.imageItemWrapper}>
					<Image style={{width: '100%', height: 230}} width={300} height={300} src={_.get(contentItemData, 'data.file2.url')} alt='' />
					<span style={{color: '#898989'}}>{_.get(contentItemData, 'data.text2')}</span>
				</div>
			</div>
		</div>
	)
}

export default CmsItemTwoImages
