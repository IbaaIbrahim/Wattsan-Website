'use client'

import { FormRadioConfigurator } from '@components/ui/inputs/form-radio/configurator-variant/FormRadioConfigurator'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import { Typography } from '@components/ui/typography/Typography'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { configuratorStore } from '@store/configurator'

import styles from './Equipment.module.scss'

const Equipment = () => {
	const { translations }: { translations: ILanguage } = useLang()

	const categoryId = configuratorStore.use.categoryId()
	const categories = configuratorStore.use.categories()

	const handleChange = id => {
		configuratorStore.set.categoryId(id)
	}

	if (!categories?.length) return null

	return (
		<div className={styles.container}>
			<Typography
				className={styles.title}
				tag='p'
				size='l'
			>
				{translations.equipment.title}
			</Typography>
			<section className={styles.filters}>
				<FormRadioConfigurator
					value={categoryId}
					options={categories.map(({ name, id }) => ({
						text: name,
						value: id
					}))}
					onChange={handleChange}
				/>
			</section>
			<section className={styles.mobileFilters}>
				<FormSelect
					value={categoryId}
					options={categories.map(cat => ({
						value: cat.id,
						text: cat.name
					}))}
					onSelect={selected => handleChange(selected)}
				/>
			</section>
		</div>
	)
}

export default Equipment
