'use client'

import SessionPlate from '@components/modules/account/session-plate/SessionPlate'
import Button from '@components/ui/button/Button'
import FormInput from '@components/ui/form-input/FormInput'
import Input from '@components/ui/input/Input'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import FormSwitch from '@components/ui/inputs/form-switch/FormSwitch'
import { MODALS } from '@components/ui/modal/Modal'
import Tags from '@components/ui/tags/Tags'
import changeAvatarIcon from '@public/img/icons/change-avatar.svg'
import changeNameIcon from '@public/img/icons/change-name.svg'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { useState } from 'react'

import styles from './SettingsView.module.scss'

const SESSION_MOCK = [
	{
		id: '1001',
		name: 'Desktop Mac OS X',
		place: 'England, London',
		ip: '783.183.55.9',
		status: 'Active'
	},
	{
		id: '1001',
		name: 'Desktop Mac OS X',
		place: 'England, London',
		ip: '783.183.55.9',
		status: 'Inactive'
	},
	{
		id: '1001',
		name: 'Desktop Mac OS X',
		place: 'England, London',
		ip: '783.183.55.9',
		status: 'Inactive'
	},
	{
		id: '1001',
		name: 'Desktop Mac OS X',
		place: 'England, London',
		ip: '783.183.55.9',
		status: 'Inactive'
	}
]

const SettingsView = () => {
	const [tabs, setTab] = useState('0')

	const handleNameModal = () => {
		modalsStore.set.open(MODALS.changeName, {
			onChange: modalsStore.set.close()
		})
	}

	const handleEndSession = (allSession = false) => {
		modalsStore.set.open(MODALS.endSession, { allSession })
	}

	const handleSuccessDelete = () => {
		modalsStore.set.open(MODALS.deleteSuccess)
	}

	const handleDeleteModal = () => {
		modalsStore.set.open(MODALS.deleteAccount, {
			onConfirm: handleSuccessDelete
		})
	}

	const image = null

	return (
		<div className={styles.page}>
			<div className={styles.title}>Account</div>
			<Tags
				size='l'
				items={[
					{ content: 'Personal info', id: '0' },
					{ content: 'Subscriptions', id: '1' },
					{ content: 'Account security', id: '2' }
				]}
				selected={[tabs]}
				onClick={tab => setTab(tab)}
			/>
			{tabs === '0' && (
				<div className={styles.form}>
					<div className={styles.user}>
						<div className={styles.userImage}>
							{image === null ? (
								<>М</>
							) : (
								<Image
									src={image}
									alt=''
									fill={true}
								/>
							)}
							<button className={styles.changeImage}>
								<Image
									src={changeAvatarIcon}
									alt=''
								/>
							</button>
						</div>
						<div className={styles.userName}>Mark Markov</div>
						<button
							className={styles.changeName}
							onClick={handleNameModal}
						>
							<Image
								src={changeNameIcon}
								alt=''
							/>
						</button>
					</div>
					<div className={styles.fields}>
						<FormInput
							name='phone'
							label='Phone'
							placeholder='+79998889988'
							change={() => {}}
							type='phone'
						/>
						<Input
							name='email'
							label='E-mail'
						/>
					</div>
					<FormCheckbox
						className={styles.checkbox}
						label='Agree to privacy policy and personal data processing'
					/>
					<Button
						view='red'
						size='l'
						disabled={true}
					>
						Save changes
					</Button>
				</div>
			)}
			{tabs === '1' && (
				<div className={styles.switchers}>
					<FormSwitch
						name='news'
						label='Newsletters'
						checked={false}
						onChange={() => {}}
					/>
					<FormSwitch
						name='offers'
						label='Special offers and discounts'
						checked={false}
						onChange={() => {}}
					/>
					<FormSwitch
						name='notifications'
						label='Order notifications'
						checked={false}
						onChange={() => {}}
					/>
					<FormSwitch
						name='securityNotifications'
						label='Security notifications'
						checked={false}
						onChange={() => {}}
					/>
				</div>
			)}
			{tabs === '2' && (
				<div className={styles.securities}>
					<div className={styles.contentTitle}>Active sessions</div>
					<div className={styles.sessions}>
						{SESSION_MOCK.map(session => (
							<SessionPlate
								key={session.id}
								session={session}
								onClose={() => handleEndSession(false)}
							/>
						))}
					</div>
					<Button
						className={styles.endAllSessions}
						view='red'
						size='l'
						onClick={() => handleEndSession(true)}
					>
						End all sessions
					</Button>
					<div className={styles.contentTitle}>Account management</div>
					<Button
						view='bordered'
						size='l'
						onClick={handleDeleteModal}
					>
						Delete account
					</Button>
				</div>
			)}
		</div>
	)
}

export default SettingsView
