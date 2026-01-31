'use client'

import { FC, useState } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductTabs.module.scss'

export interface TabItem {
	id: string
	label: string
	content: React.ReactNode
}

interface ProductTabsProps {
	tabs: TabItem[]
	defaultTab?: string
	activeTab?: string
	onTabChange?: (tabId: string) => void
	className?: string
}

const ProductTabs: FC<ProductTabsProps> = ({ tabs, defaultTab, activeTab: controlledActiveTab, onTabChange, className }) => {
	const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id)
	
	// Use controlled tab if provided, otherwise use internal state
	const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab
	
	const handleTabClick = (tabId: string) => {
		if (controlledActiveTab === undefined) {
			setInternalActiveTab(tabId)
		}
		onTabChange?.(tabId)
	}

	const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

	return (
		<div className={clsx(styles.tabs, className)}>
			<div className={styles.tabList}>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={clsx(
							styles.tab,
							activeTab === tab.id && styles.active
						)}
						onClick={() => handleTabClick(tab.id)}
					>
						<Typography tag='p' size='m' weight={activeTab === tab.id ? 'semi-bold' : 'regular'}>
							{tab.label}
						</Typography>
					</button>
				))}
			</div>
			<div className={styles.tabContent}>
				{activeTabContent}
			</div>
		</div>
	)
}

export default ProductTabs
