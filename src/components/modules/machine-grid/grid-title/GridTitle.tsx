'use client'

import { Typography } from '@components/ui/typography/Typography'
import { configuratorStore } from '@store/configurator'
import { equipmentCategoryForm } from '@store/forms'
import { useMemo } from 'react'

import styles from './GridTitle.module.scss'

const GridTitle = () => {
	const categoryId = configuratorStore.use.categoryId()
	const categories = configuratorStore.use.categories()

	const title = useMemo(() => {
		return categories?.find?.(({ id }) => id === categoryId)?.name ?? ''
	}, [categoryId])

	return (
		<Typography
			className={styles.title}
			tag='h1'
		>
			{title}
		</Typography>
	)
}

export default GridTitle
