'use client'

import OrderItemPlate from '@components/modules/orders/order-item-plate/OrderItemPlate'
import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import { useState } from 'react'

import styles from './page.module.scss'

const RESULTS = [
	{
		imgSrc: '/img/grid-machines/A1.png',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000'
	},
	{
		imgSrc: '/img/grid-machines/A1.png',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000'
	},
	{
		imgSrc: '/img/grid-machines/A1.png',
		name: 'Laser Cutting Engraving Machine',
		code: '6040 ST',
		price: '$5000'
	}
]

const Page = props => {
	const [search, changeSearch] = useState<string>(props?.searchParams?.search)

	return (
		<div className={styles.page}>
			<div className={styles.title}>Search results</div>
			<FormAutocomplete
				className={styles.searchForm}
				value={search}
				name='search'
				onChange={changeSearch}
			/>
			<div className={styles.results}>
				{/*{RESULTS.map((item, index) => (*/}
				{/*	<OrderItemPlate*/}
				{/*		key={index}*/}
				{/*		item={item}*/}
				{/*	/>*/}
				{/*))}*/}
			</div>
		</div>
	)
}

export default Page
