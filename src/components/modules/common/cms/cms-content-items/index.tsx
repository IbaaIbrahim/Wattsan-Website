import PropTypes from 'prop-types';
import React, { FC } from 'react'



// import CmsItemImage from "./cms-item-image"
import CmsItemEditor from "./cms-item-editor";
import CmsItemTextWithImage from '@components/modules/common/cms/cms-content-items/cms-item-text-with-image'
import CmsItemImageSlider from '@components/modules/common/cms/cms-content-items/cms-item-image-slider'
import CmsItemTextWithTable from '@components/modules/common/cms/cms-content-items/cms-item-text-with-table'
import CmsItemVideo from '@components/modules/common/cms/cms-content-items/cms-item-video'
import CmsItemTextInBordersWithInfoIcon
	from '@components/modules/common/cms/cms-content-items/cms-item-text-in-borders-with-info-icon'
import CmsItemTwoImages from '@components/modules/common/cms/cms-content-items/cms-item-two-images'
import CmsItemTextWithSections from '@components/modules/common/cms/cms-content-items/cms-item-text-with-sections'


// import CmsImageWithButton from "./cms-image-with-button"
// import CmsItemImageSlider from "./cms-item-carousel"

const CmsItemsWrapper: FC<{contentItemData: any}> = ({ contentItemData }) => {

	if (contentItemData.type === 'editor') {
		return <CmsItemEditor contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'text-with-image') {
		return <CmsItemTextWithImage contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'image-slider') {
		return <CmsItemImageSlider contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'text-with-table') {
		return <CmsItemTextWithTable contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'video') {
		return <CmsItemVideo contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'text-in-border-with-info-icon') {
		return <CmsItemTextInBordersWithInfoIcon contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'two-images') {
		return <CmsItemTwoImages contentItemData={contentItemData}/>
	}

	if (contentItemData.type === 'text-with-sections') {
		return <CmsItemTextWithSections contentItemData={contentItemData}/>
	}

	// if (contentItemData.type === 'image') {
	// 	return (
	// 		<CmsItemImage {...props} />
	// 	)
	// }
	//
	// if (contentItemData.type === 'image-with-button') {
	// 	return (
	// 		<CmsImageWithButton {...props} />
	// 	)
	// }
	//
	// if (contentItemData.type === 'image-slider') {
	// 	return (
	// 		<CmsItemImageSlider {...props} />
	// 	)
	// }

	return null
}

export default CmsItemsWrapper
