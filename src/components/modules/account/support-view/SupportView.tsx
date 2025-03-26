'use client'

import SupportPlate from '@components/modules/account/support-plate/SupportPlate'
import BlankContent from '@components/modules/common/blank-content/BlankContent'
import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import Tags from '@components/ui/tags/Tags'
import { TRequests } from '@my-types/support'
import supportEmpty from '@public/img/account/support-empty.svg'
import { modalsStore } from '@store/modals'
import { FC, useState } from 'react'

import styles from './SupportView.module.scss'

const STATUS_MAP = {
	'In process': '1',
	Completed: '2'
}

const SupportView: FC<{ requests: TRequests }> = ({ requests }) => {
	const [filter, setFilter] = useState('0')

	const filteredRequests = filter.includes('0')
		? requests
		: requests.filter(({ status }) => filter.includes(STATUS_MAP[status]))

	const handleCreateRequest = () => {
		modalsStore.set.open(MODALS.requestSupport)
	}

	const handleCreateCallback = () => {
		modalsStore.set.open(MODALS.requestCallback)
	}

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div className={styles.title}>Support</div>
				<div className={styles.subtitle}>
					Here is where your equipment and its complete information are stored:
					history,
					<br /> warranty details, manufacturing date, and more.
				</div>
				<Button
					className={styles.requestCallback}
					size='l'
					view='bordered'
					onClick={handleCreateCallback}
				>
					Request a callback
				</Button>
			</div>
			{requests.length === 0 ? (
				<BlankContent
					image={supportEmpty}
					title={
						<>
							You currently have no <br /> support requests
						</>
					}
					description={
						<>
							All your requests will be available here. If you need <br /> our
							assistance, please leave an inquiry, and we'll help <br /> you
							promptly.
						</>
					}
					action='Create a request'
					onClick={handleCreateRequest}
				/>
			) : (
				<div>
					<div className={styles.requestsTitle}>Your requests</div>
					<div className={styles.requestsFilter}>
						<Tags
							selected={[filter]}
							items={[
								{ content: 'All', id: '0' },
								{ content: 'In process', id: '1' },
								{ content: 'Completed', id: '2' }
							]}
							size='l'
							onClick={setFilter}
						/>
						<Button
							view='red'
							size='l'
							onClick={handleCreateRequest}
						>
							Create a request
						</Button>
					</div>
					<div className={styles.requests}>
						{filteredRequests.map((request, index) => (
							<SupportPlate
								key={index}
								request={request}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default SupportView
