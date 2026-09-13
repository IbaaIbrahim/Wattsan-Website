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
import { use, useEffect, useRef, useState } from 'react'

import styles from './SettingsView.module.scss'
import { _getFileManagerItemData, _storeFileManagerItem } from '@components/file-manager/actions'
import { authStore } from '@store/auth'
import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/bootstrap.css';
import { Form } from '@components/ui/inputs/form/Form'
import { Label } from '@headlessui/react'
import { updateUserInfo } from '@store/auth/actions'
import { set } from 'lodash'

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
	const user = authStore.use.user()
	const [tabs, setTab] = useState('0')
	const [profileImage, setProfileImage] = useState(user.fileManagerId || user.profilePicture || null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [uploading, setUploading] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [acknowledged, setAcknowledged] = useState(false)
	const [userName, setUserName] = useState(user.firstname || '')
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')

	useEffect(() => {
		if (profileImage && typeof profileImage === 'string') {
			if (profileImage.startsWith('http') || profileImage.startsWith('blob:') || profileImage.startsWith('/')) {
				setPreviewUrl(profileImage)
			} else {
				_getFileManagerItemData(profileImage, (items: any[]) => {
					if (items?.[0]?.url) {
						setPreviewUrl(items[0].url)
					}
				})
			}
		}
	}, [profileImage])

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const localPreview = URL.createObjectURL(file)
		setPreviewUrl(localPreview)

		const formData = new FormData()
		formData.append('files', file)
		formData.append('IsFile', 'true')
		formData.append('FileType', '1')

		setUploading(true)
		_storeFileManagerItem(
			formData,
			(response: any) => {
				setUploading(false)
				const uploadedFile = Array.isArray(response)
					? response[0]
					: (response?.data?.[0] || response?.data || response)
				const fileId = uploadedFile?.id || (typeof response === 'string' ? response : null)
				if (fileId) {
					setProfileImage(fileId)
					if (uploadedFile?.url) {
						setPreviewUrl(uploadedFile.url)
					}
				}
			},
			() => {
				console.error('Failed to upload image')
				setUploading(false)
			}
		)
	}

	const handleNameModal = () => {
		modalsStore.set.open(MODALS.changeName, {
			onChange: (name) => {
				setUserName(name)
				modalsStore.set.close()
			},
			onClose: () => modalsStore.set.close()
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

	const handleSaveUserInfo = (data) => {
		updateUserInfo(
			{
				id: user.id,
				email: user.email,
				phoneNumber: phoneNumber || user.phoneNumber || null,
				firstName: userName || user?.firstname || null,
				fileManagerId: profileImage || null
			},
			() => {},
			() => {}
		)
	}
	
	return (
		<div className={styles.page}>
			<div className={styles.title}>Account</div>
			<Tags
				size='l'
				items={[
					{ content: 'Personal info', id: '0' },
					// { content: 'Subscriptions', id: '1' },
					// { content: 'Account security', id: '2' }
				]}
				selected={[tabs]}
				onClick={tab => setTab(tab)}
			/>
			{tabs === '0' && (
				<div className={styles.form}>
					<div className={styles.user}>
						<div
							className={styles.userImage}
							onClick={() => fileInputRef.current?.click()}
							style={{ cursor: 'pointer' }}
							title="Click to change photo"
						>
							<input
								type="file"
								ref={fileInputRef}
								accept="image/*"
								style={{ display: 'none' }}
								onChange={handleFileSelect}
							/>
							{previewUrl ? (
								<Image
									src={previewUrl}
									alt="Profile"
									fill
									style={{ objectFit: 'cover', borderRadius: '50%' }}
									unoptimized
								/>
							) : (
								<span>{(userName || user?.firstname || user?.userName || 'U')[0]?.toUpperCase()}</span>
							)}
							<button
								type="button"
								className={styles.changeImage}
								onClick={(e) => {
									e.stopPropagation()
									fileInputRef.current?.click()
								}}
								aria-label="Upload photo"
							>
								<Image
									src={changeAvatarIcon}
									alt=""
								/>
							</button>
						</div>
						<div className={styles.userName}>{userName ?? user?.firstname ?? 'No name'}</div>
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
						<Input
							name='email'
							label='E-mail'
							value={user?.email}
							disabled={true}
							inputWrapperClassName={styles.emailInput}
						/>
						<div>
						<label className={styles.phoneLabel}>Phone</label>
						<PhoneInput
							value={phoneNumber || ''}
							onChange={phone => {
								setPhoneNumber(phone)
							}}
						/>
							</div>
						{/* <FormInput
							name='phone'
							label='Phone'
							placeholder='+79998889988'
							change={() => {}}
							type='phone'
						/> */}
					</div>
					<FormCheckbox
						className={styles.checkbox}
						label='Agree to privacy policy and personal data processing'
						selected={acknowledged}
						onChange={() => setAcknowledged(!acknowledged)}
					/>
					<Button
						view='red'
						size='l'
						disabled={!acknowledged}
						onClick={handleSaveUserInfo}
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
