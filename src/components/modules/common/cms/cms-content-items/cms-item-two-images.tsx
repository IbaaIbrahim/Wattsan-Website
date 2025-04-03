import PropTypes from 'prop-types';
import React, { FC } from 'react'
import _ from 'lodash'

import styles from './cms-item-two-images.module.scss'
import Image from 'next/image'
import clsx from 'clsx'

const CmsItemTwoImages: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<div className={clsx(styles.content, 'cms-item-two-images-content')}>
				<div className={clsx(styles.imageItemWrapper, 'cms-item-two-images-image-wrapper')}>
					<div style={{position: 'relative', flex: '1 1 0'}}>
						<Image fill src={_.get(contentItemData, 'data.file1.url')} alt='' />
					</div>
					<span style={{color: '#898989'}}>{_.get(contentItemData, 'data.text1')}</span>
				</div>
				<div className={clsx(styles.imageItemWrapper, 'cms-item-two-images-image-wrapper')}>
					<div style={{position: 'relative', flex: '1 1 0'}}>
						<Image fill src={_.get(contentItemData, 'data.file2.url')} alt='' />
					</div>
					<span style={{color: '#898989'}}>{_.get(contentItemData, 'data.text2')}</span>
				</div>
			</div>
		</div>
	)
}

export default CmsItemTwoImages
