import PropTypes from 'prop-types';
import React, { FC } from 'react'
import DOMPurify from 'dompurify';
import _ from 'lodash';

import styles from './cms-item-text-with-table.module.scss'
import Image from 'next/image'

const CmsItemTextWithTable: FC<{contentItemData: any}> = ({ contentItemData }) => {

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>
				{contentItemData?.data?.title}
			</h3>
			<div className={styles.content}>
				<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentItemData?.data?.text) }} />
			</div>
			<div className={styles.table}>
				<table>
					<thead>
					<tr>
						<th style={{width: '30%'}} className={styles.th}>{contentItemData?.data?.table?.c1_title}</th>
						<th style={{width: '70%'}} className={styles.th}>{contentItemData?.data?.table?.c2_title}</th>
					</tr>
					</thead>
					<tbody>
					{
						_.map(contentItemData?.data?.table?.data, tableItem =>{
							return (
								<tr key={tableItem.uuid}>
									<td style={{color: 'black', fontWeight: 'bolder'}} className={styles.td}>{tableItem.title}</td>
									<td className={styles.td}>
										<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.parse(tableItem.value ?? '')) }} />
									</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default CmsItemTextWithTable
