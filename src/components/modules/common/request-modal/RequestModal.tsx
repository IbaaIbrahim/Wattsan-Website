import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import { MODALS } from '@components/ui/modal/Modal'
import { Typography } from '@components/ui/typography/Typography'
import { modalsStore } from '@store/modals'
import React, { useEffect, useState } from 'react'

import styles from './RequestModal.module.scss'

const RequestModal = ({
	machineName,
	paramName
}: {
	machineName: string
	paramName: string
}) => {
	return (
		<>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Incompatibility issue
			</Typography>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='l'
			>
				These accessories are not compatible with {machineName}
			</Typography>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Typography
						tag='p'
						size='s'
					>
						{paramName}
					</Typography>
				</li>
			</ul>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='l'
			>
				You can configure a new machine while saving the current configuration
			</Typography>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='m'
				weight='regular'
			>
				Unfortunately, this machine is temporarily unavailable for
				configuration. Please leave a callback request, and our manager will
				advise you regarding the M1 S machine.
			</Typography>
			<div>
				<Input
					className={styles.field}
					name='fullname'
					label='Full Name'
					placeholder='Enter your Full Name'
				/>
				<Input
					name='phone'
					label='Phone'
					placeholder='Enter your phone number'
				/>
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					onClick={() => {
						modalsStore.set.open(MODALS.infoModal, {
							title: 'Thank you for your request',
							description:
								'Your request for a callback has been received. Our team will shortly get in touch with you at the phone number you provided:',
							accentButton: {
								text: 'Return to configurator',
								onClick: () => modalsStore.set.close()
							}
						})
					}}
				>
					Request a callback
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Cancel
				</Button>
			</div>
			<Typography
				tag='p'
				size='s'
				discolored={true}
				align='center'
			>
				Cancelling result: Work area size 600х900 mm
			</Typography>
		</>
	)
}

export default RequestModal
