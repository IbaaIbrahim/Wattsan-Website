import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import clsx from 'clsx'
import { FC, useState } from 'react'
import _ from 'lodash'

import styles from './index.module.scss'
import './index.scss'
import CmsItemsWrapper from '@components/modules/common/cms/cms-content-items'

const CmsContent: FC<{content: any}> = ({ content }) => {

	return (
		<div className={clsx(styles.wrapper, 'cms-wrapper')}>
			{
				_.map(content, contentItemData => {
					return (
						<CmsItemsWrapper
							key={contentItemData.uuid}
							contentItemData={contentItemData}
						/>
					)
				})
			}
		</div>
	)
}

export default CmsContent
