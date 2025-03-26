'use client'

import BlankContent from '@components/modules/common/blank-content/BlankContent'
import ConfigurationMachinePlate from '@components/modules/common/configuration-machine-plate/ConfigurationMachinePlate'
import PopularTemplate from '@components/modules/common/popular-template/PopularTemplate'
import { MODALS } from '@components/ui/modal/Modal'
import Tags from '@components/ui/tags/Tags'
import { TGetConfigurations } from '@my-types/configurations'
import emptyConfigurationsImage from '@public/img/account/empty-configurations.svg'
import { configurationsStore } from '@store/configurationsStore'
import { modalsStore } from '@store/modals'
import * as R from 'ramda'
import { FC } from 'react'

import styles from './ConfigurationsView.module.scss'

const STATUS_MAP = {
	All: '0',
	Templates: '1',
	'In process': '2',
	Ordered: '3',
	Deleted: '4'
}

const TEMPLATES_MAP = {
	All: '0',
	'Laser machines': '1',
	'CNC Routers': '2',
	'For wood': '3',
	'For metal': '4',
	'For thin materials': '5',
	'For hobbies': '6'
}

const ConfigurationsView: FC<{ configurations: TGetConfigurations }> = ({
	configurations
}) => {
	const { configurationFilter, changeConfigurationFilter } =
		configurationsStore(state => ({
			configurationFilter: state.configurationsFilter,
			changeConfigurationFilter: state.changeFilter
		}))

	const { templatesFilter, changeTemplatesFilter } = configurationsStore(
		state => ({
			templatesFilter: state.templatesFilter,
			changeTemplatesFilter: state.changeTemplatesFilter
		})
	)

	const filteredConfigurations = configurationFilter.includes('0')
		? configurations.configurations
		: configurations.configurations.filter(configuration =>
				configurationFilter.includes(STATUS_MAP[configuration.status])
			)

	const filteredTemplates = templatesFilter.includes('0')
		? configurations.myTemplates
		: configurations.myTemplates.filter(
				template =>
					R.intersection(
						templatesFilter,
						template.tags.map(tag => TEMPLATES_MAP[tag])
					).length > 0
			)

	const handleViewConfiguration = (id: string) => () => {}

	const handleViewSpecification = (id: string) => () => {
		modalsStore.set.open(MODALS.configurationComparisonModal, {
			basicSpecification: configurations.basicSpecification,
			params: configurations.configurations.find(
				configuration => configuration.id === id
			)
		})
	}

	const handleReadMore = (id: string) => () => {
		const template = configurations.popularTemplates.find(
			template => template.id === id
		)

		if (template === undefined) {
			return
		}

		modalsStore.set.open(MODALS.templateReadMoreModal, {
			image: template.image,
			id,
			title: template.description.title,
			content: template.description.content,
			price: template.description.price,
			code: template.code,
			name: template.name
		})
	}

	const handleEdit = (id: string) => {}

	const handleDownload = (id: string) => {}

	const handleDuplicate = (id: string) => {
		const configuration = configurations.configurations.find(
			configuration => configuration.id === id
		)

		if (configuration === undefined) {
			return
		}

		modalsStore.set.open(MODALS.duplicateConfigurationModal, {
			name: configuration.name,
			price: configuration.price,
			image: configuration.image,
			code: configuration.code
		})
	}

	const handleDelete = (id: string) => {
		const configuration = configurations.configurations.find(
			configuration => configuration.id === id
		)

		if (configuration === undefined) return

		modalsStore.set.open(MODALS.deleteConfigurationModal, {
			name: configuration.name,
			price: configuration.price,
			image: configuration.image,
			code: configuration.code
		})
	}

	return (
		<>
			<header className={styles.header}>
				<h2 className={styles.title}>Configurations</h2>
				<Tags
					items={[
						{ id: '0', content: 'All' },
						{ id: '1', content: 'Templates' },
						{ id: '2', content: 'In process' },
						{ id: '3', content: 'Ordered' },
						{ id: '4', content: 'Deleted' }
					]}
					selected={configurationFilter}
					size='l'
					onClick={changeConfigurationFilter}
				/>
			</header>
			{configurations.configurations.length === 0 ? (
				<BlankContent
					image={emptyConfigurationsImage}
					title='No saved configurations'
					description={
						<>
							Create unique equipment configurations, and they'll <br /> be
							displayed in this section.
						</>
					}
					action='New configuration'
				/>
			) : (
				<div className={styles.popularTemplates}>
					{filteredConfigurations.map(configuration => (
						<ConfigurationMachinePlate
							key={configuration.id}
							item={configuration}
							onViewConfiguration={handleViewConfiguration(configuration.id)}
							onViewSpecification={handleViewSpecification(configuration.id)}
							onEdit={handleEdit}
							onDownload={handleDownload}
							onDuplicate={handleDuplicate}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
			{configurationFilter.includes('1') && (
				<div>
					<div className={styles.templatesFilter}>
						<Tags
							items={[
								{ content: 'All', id: '0' },
								{ content: 'Laser machines', id: '1' },
								{ content: 'CNC Routers', id: '2' },
								{ content: 'For wood', id: '3' },
								{ content: 'For metal', id: '4' },
								{ content: 'For thin materials', id: '5' },
								{ content: 'For hobbies', id: '6' }
							]}
							selected={templatesFilter}
							onClick={changeTemplatesFilter}
						/>
						<button
							className={styles.templatesReset}
							onClick={() => changeTemplatesFilter('0')}
						>
							Reset all
						</button>
					</div>
					{filteredTemplates.map(template => (
						<PopularTemplate
							key={template.id}
							template={template}
							onReadMore={handleReadMore(template.id)}
							onEdit={() => {}}
						/>
					))}
				</div>
			)}
			<div className={styles.popularTemplatesTitle}>Popular templates</div>
			<div className={styles.popularTemplates}>
				{configurations.popularTemplates.map(template => (
					<PopularTemplate
						key={template.id}
						template={template}
						onReadMore={handleReadMore(template.id)}
						onEdit={() => {}}
					/>
				))}
			</div>
		</>
	)
}

export default ConfigurationsView
