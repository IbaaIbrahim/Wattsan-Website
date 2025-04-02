import PropTypes from 'prop-types';
import React, { FC } from 'react'
import _ from 'lodash';

import styles from './cms-item-image-slider.module.scss'
import Carousel from '@components/ui/carousel/Carousel'

const CmsItemImageSlider: FC<{contentItemData: any}> = ({ contentItemData }) => {
	const items = _.map(contentItemData?.data?.images, image => ({
		url: image?.file?.url,
		isVideo: false,
		placeholder: image?.file?.url
	}))

	return (
		<div className={styles.wrapper}>
			<Carousel
				items={items}
				maxImageSize={580}
			/>
		</div>
	)
}

export default CmsItemImageSlider
