import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';
import _ from 'lodash';

import styles from './cms-item-text-in-borders-with-info-icon.module.scss'
import Image from 'next/image'
import promoInfoIcon from '@public/img/icons/promo-info.svg'

const CmsItemTextInBordersWithInfoIcon: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div>
					<Image
						src={promoInfoIcon}
						alt=''
					/>
				</div>
				<div className={styles.text}>
					{
						_.get(contentItemData, 'data.text')
					}
				</div>
			</div>
		</div>
	)
}

export default CmsItemTextInBordersWithInfoIcon
