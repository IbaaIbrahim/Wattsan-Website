'use client'

import PlateFoldable from '@components/modules/common/plate-foldable/PlateFoldable'
import DownloadFile from '@components/modules/support/download-file/DownloadFile'
import FilesSection from '@components/modules/support/files-section/FilesSection'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import Tags from '@components/ui/tags/Tags'
import autoCadIcon from '@public/img/support/autocad-icon.png'
import fileIcon from '@public/img/support/file-icon.png'
import imageIcon from '@public/img/support/image-icon.png'
import videoIcon from '@public/img/support/video-icon.png'
import { useEffect, useMemo, useState } from 'react'

import styles from './page.module.scss'
import { authorizedRequest, request } from '../../../utils/request'
import { API_GET_SUPPORT_TRAINING_FILES } from '@constants/api'

const MATERIALS = {
	files: [
		{ id: 'file_1001', name: 'AutoCAD', system: 'MacOS', icon: autoCadIcon },
		{ id: 'file_1002', name: 'AutoCAD', system: 'MacOS', icon: autoCadIcon },
		{ id: 'file_1003', name: 'AutoCAD', system: 'MacOS', icon: autoCadIcon }
	],
	education: [
		{
			name: 'Software Installation & Safety',
			description: 'Preparation',
			links: [
				{
					id: 'software_1001',
					name: 'Installation and setup of the laser machine',
					url: 'www.youtube.com',
					icon: videoIcon
				},
				{
					id: 'software_1002',
					name: 'Introduction to basic safety protocols',
					url: 'Basic_Safety_Protocols.jpg',
					icon: imageIcon
				},
				{
					id: 'software_1003',
					name: 'Understanding the machine components',
					url: 'www.youtube.com',
					icon: fileIcon
				}
			]
		},
		{
			name: 'Introduction & Basics',
			description: 'Step 1',
			links: [
				{
					id: 'introduction_1001',
					name: 'Installation and setup of the laser machine',
					url: 'www.youtube.com',
					icon: videoIcon
				},
				{
					id: 'introduction_1002',
					name: 'Introduction to basic safety protocols',
					url: 'Basic_Safety_Protocols.jpg',
					icon: imageIcon
				},
				{
					id: 'introduction_1003',
					name: 'Understanding the machine components',
					url: 'www.youtube.com',
					icon: fileIcon
				}
			]
		}
	]
}

const TRAINING_MATERIALS = [
	{
		name: 'Laser machines',
		items: [
			{
				name: 'Laser Cutting Engraving Machine 0203 micro, 0305, 0604',
				codes: '0203 micro, 0305, 0604',
				id: '1001',
				...MATERIALS
			},
			{
				name: 'Laser Cutting Machine 6090, 1290, 1610',
				codes: '0203 micro, 0305, 0604',
				id: '1002',
				...MATERIALS
			},
			{
				name: 'Laser Cutting Machine 1325, 2030',
				codes: '0203 micro, 0305, 0604',
				id: '1003',
				...MATERIALS
			},
			{
				name: 'Laser Cutting Machine 1610 Duos ST',
				codes: '0203 micro, 0305, 0604',
				id: '1004',
				...MATERIALS
			}
		]
	},
	{ name: 'CNC Routes', items: [] }
]

const Page = () => {
	const [equipmentType, setEquipmentType] = useState<string>('')
	const [equipment, setEquipment] = useState<string>('')
	const [materials, setMaterials] = useState<string>('1')

	const [data, setData] = useState([])

	const equipmentInfo: any = useMemo(() => {
		const currentEquipment = data?.find(({ id }: any) => id === equipmentType) as any
		const supportAsset = currentEquipment?.supportAssets?.find(
			({ id }: any) => id === equipment
		) ?? {}
		if (supportAsset.id > 0) {
			const files = supportAsset.supportFiles?.filter((x: any) => x.categoryType === (materials == '1' ? 1 : 2)) || []
			const sections = files.filter((x: any) => x.parentId === null)

			const fullTitle = (supportAsset.title || '').trim()
			const catName = (currentEquipment?.name || '').trim()
			let titleName = fullTitle
			let titleCodes = ''

			if (catName && fullTitle.toLowerCase().startsWith(catName.toLowerCase())) {
				titleName = fullTitle.slice(0, catName.length).trim()
				titleCodes = fullTitle.slice(catName.length).trim()
			} else {
				const match = fullTitle.match(/^(.+?)\s+((?:[A-Z]\d|\d{2,4}).*)$/i)
				if (match) {
					titleName = match[1].trim()
					titleCodes = match[2].trim()
				} else if (catName && catName.toLowerCase() !== fullTitle.toLowerCase()) {
					titleName = catName
					titleCodes = fullTitle
				}
			}

			return {
				id: supportAsset.id,
				name: titleName,
				codes: titleCodes,
				files: sections.map((section: any) => ({
					id: section.id,
					name: section.title,
					description: section.stepName,
					links: files.filter((x: any) => x.parentId === section.id).map((x: any) => ({
						id: x.id,
						icon: x.fileType === 1 ? imageIcon : (x.fileType === 2 ? videoIcon : fileIcon),
						name: x.title,
						description: x.stepName,
						url: x?.fileManger?.url ?? x?.fileManager?.url ?? ''
					}))
				}))
			}
		}
		return {}
	}, [equipmentType, equipment, materials, data])

	useEffect(() => {
		const getData = async () => {
			const response = await request({
				url: API_GET_SUPPORT_TRAINING_FILES,
				method: 'GET'
			})
			setData(response.data)
			if (response?.data?.length > 0) {
				const firstWithAssets = response.data.find((item: any) => item.supportAssets && item.supportAssets.length > 0) || response.data[0]
				if (firstWithAssets) {
					setEquipmentType(firstWithAssets.id)
					if (firstWithAssets.supportAssets?.length > 0) {
						setEquipment(firstWithAssets.supportAssets[0].id)
					}
				}
			}
		}
		getData().then(() => { })
	}, [])

	return (
		<div className={styles.page}>
			<div className={styles.sidebar}>
				<div className={styles.sidebarTitle}>Equipment</div>
				<div className={styles.mobileTypes}>
					<FormSelect
						size='m'
						label='Choose equipment'
						value={equipmentType}
						options={data?.map(equipment => ({
							value: equipment.id,
							text: equipment.name
						}))}
						onSelect={selected => {
							setEquipmentType(selected)
						}}
					/>
					<FormSelect
						size='m'
						label='Choose model'
						value={equipment}
						options={
							data?.find(
								({ id }) => id === equipmentType
							)?.supportAssets?.map?.(item => ({
								value: item.id,
								text: item.title
							})) ?? []
						}
						onSelect={selected => {
							setEquipment(selected)
						}}
					/>
				</div>
				<div className={styles.types}>
					{data?.map(equipment => (
						<PlateFoldable
							key={equipment.name}
							wrapperBorder={false}
							className={styles.sidebarPlate}
							headerClassName={styles.plateHeader}
							title={
								<div className={styles.serviceTitle}>{equipment.name}</div>
							}
							content={
								<>
									<div className={styles.machines}>
										{equipment?.supportAssets?.map(item => (
											<button
												key={item.id}
												className={styles.machineName}
												onClick={() => {
													setEquipmentType(equipment.id)
													setEquipment(item.id)
												}}
											>
												{item.title}
											</button>
										))}
									</div>
								</>
							}
							defaultFolded={true}
							foldable={true}
						/>
					))}
				</div>
			</div>
			<div className={styles.content}>
				{equipmentInfo?.name && (
					<>
						<div className={styles.titleWrapper}>
							<div className={styles.title}>{equipmentInfo?.name}</div>
							{equipmentInfo?.codes ? (
								<div className={styles.subtitle}>{equipmentInfo?.codes}</div>
							) : null}
						</div>
						<div className={styles.tabs}>
							<Tags
								selected={[materials]}
								size='l'
								items={[
									{ content: 'Drivers and other files', id: '1' },
									{
										content: 'Education',
										id: '2'
									}
								]}
								onClick={setMaterials}
							/>
						</div>
						{/*<div className={styles.materials}>*/}
						{/*	{materials === '01'*/}
						{/*		? equipmentInfo.files.map(file => (*/}
						{/*				<DownloadFile*/}
						{/*					key={file.id}*/}
						{/*					file={file}*/}
						{/*				/>*/}
						{/*			))*/}
						{/*		: equipmentInfo.education.map(section => (*/}
						{/*				<FilesSection*/}
						{/*					key={section.name}*/}
						{/*					info={section}*/}
						{/*				/>*/}
						{/*			))}*/}
						{/*</div>*/}
						<div className={styles.materials}>
							{equipmentInfo?.files?.map(section => (
								<FilesSection
									key={section.name}
									info={section}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Page
