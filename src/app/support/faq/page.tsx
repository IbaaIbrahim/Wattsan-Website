'use client'

import Article from '@components/modules/support/article/Article'
import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import Tags from '@components/ui/tags/Tags'
import searchIcon from '@public/img/support/search-icon.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import styles from './page.module.scss'
import { authStore } from '@store/auth'

const article = [
	{ type: 'header', text: 'CNC Router machines for hobby' },
	{
		type: 'paragraph',
		text: 'In this article we will introduce you to the best CNC routers for hobby, tell you how to choose such equipment, what types of wood it is capable of processing and what products can be made with the help of this machine.'
	},
	{
		type: 'title',
		text: 'Top 3 CNC routers for hobby'
	},
	{
		type: 'paragraph',
		text: [
			'What should a hobby milling machine look like? The first thing that comes to mind is a compact machine that can easily fit into a medium-sized workshop or even at home. At the same time, it should be reliable and productive, so you can enjoy working with it.',
			'We have brought together the best value for money in this top list. You will find the perfect hobby CNC router for the home that fits on a normal table, as well as large floor-standing models for a large workshop.'
		]
	},
	{
		type: 'title',
		text: 'Wattsan 0404 mini hobby CNC router for home use'
	},
	{
		type: 'paragraph',
		text: 'The Wattsan milling machines labelled “mini” are table machines. The dimensions of this model are only 715x710x740 mm and the size of the working area is 400×400 mm. The machine is perfect for relief engraving and milling of small-sized products: decorative elements for furniture and interiors, ornaments and patterns, inscriptions, emblems and drawings, shelves, stands, holders, cutting boards, models and prototypes, wooden toys, puzzles and other items for hobby or art.'
	},
	{
		type: 'paragraph',
		text: [
			'The spindle power is 1.5 kW and the speed is 24,000 rpm, which is sufficient for basic machining of all wood materials and plastics. The clearance of the portal is 100 mm – excellent for deep milling, but not enough to connect the rotary unit, so it is not possible to produce, for example, carved balusters on this machine.',
			'Despite its small size, the machine is equipped with HIWIN 20 mm guideways in the X and Y axes. These guideways are also used on large format CNC milling machines. As a result, the accuracy of the Wattsan 0404 mini is 0.02 mm and is maintained throughout the life of the machine thanks to the sturdy frame and well thought-out design.'
		]
	}
]

const ARTICLES = [
	{ id: '1001', text: 'CNC Router machines for hobby' },
	{ id: '1002', text: 'How can I track my order?' },
	{ id: '1003', text: 'What payment methods do you accept?' },
	{
		id: '1004',
		text: 'How can I contact your customer support?'
	},
	{
		id: '1005',
		text: 'How can I submit a request for service support?'
	},
	{
		id: '1006',
		text: 'Do you offer discounts for regular customers?'
	},
	{
		id: '1007',
		text: 'Can I return an item if it arrives damaged?'
	},
	{ id: '1008', text: 'Is there a warranty on your products?' }
]

const Page = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const clientId = authStore.get.clientId()

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<FormAutocomplete
					className={styles.search}
					name='faqSearch'
					color='blue'
					value={searchValue}
					placeholder='Search help article'
					options={[
						{
							value: 'Laser Cutting Engraving Machine 0203 micro, 0305, 0604',
							id: '01'
						},
						{ value: 'Laser Cutting Machine 6090, 1290, 1610', id: '02' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1325, 2030', id: '03' },
						{ value: 'Laser Cutting Machine 1610 Duos ST', id: '04' }
					]}
					rightAddon={
						<Image
							src={searchIcon}
							alt=''
						/>
					}
					onChange={setSearchValue}
				/>
			</div>
			<div className={styles.content}>
				<Tags
					selected={['01']}
					size='l'
					items={[
						{ content: 'Popular', id: '01' },
						{ content: 'Equipment', id: '02' },
						{ content: 'Service support', id: '03' },
						{ content: 'Order placement', id: '04' },
						{ content: 'Payment and docs', id: '05' },
						{ content: 'Delivery', id: '06' },
						{ content: 'Returns', id: '07' },
						{ content: 'Personal Info', id: '08' }
					]}
					onClick={() => {}}
				/>
				<div className={styles.contentInner}>
					<div className={styles.navigation}>
						<div className={styles.navigationTitle}>Articles</div>
						<FormSelect
							className={styles.navigationLinksMobile}
							options={ARTICLES.map(({ id: value, text }) => ({ value, text }))}
							value='1001'
							onSelect={() => {}}
						/>
						<div className={styles.navigationLinks}>
							{ARTICLES.map(({ id, text }) => (
								<button
									key={id}
									className={clsx(
										styles.navigationLink,
										id === '1001' && styles.navigationLinkActive
									)}
								>
									{text}
								</button>
							))}
						</div>
					</div>
					<div className={styles.article}>
						<Article article={article} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
