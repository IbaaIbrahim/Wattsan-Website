'use client'

import { formatProductModelName, getProductsBySeriesId } from '@api/product'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { SupportCallback } from '@my-types/supportCallback'
import { TSeries } from '@store/configurator/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CONFIGURATOR_PAGES } from '../../../../config/pages.url.config'

import styles from './MachinesItem.module.scss'

const MachinesItem = ({
	machineData,
	category
}: {
	machineData: TSeries & any
	category: any
}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const router = useRouter()
	const [products, setProducts] = useState<any[]>([])

	useEffect(() => {
		let isMounted = true
		if (machineData?.id) {
			getProductsBySeriesId(machineData.id).then((prods) => {
				if (isMounted && prods && prods.length > 0) {
					setProducts(prods)
				}
			})
		}
		return () => {
			isMounted = false
		}
	}, [machineData?.id])

	const characteristicByWorkArea = machineData?.seriesCharacteristics?.filter?.(
		({ code, isAvailable, isDefault }: any) => {
			return code === 'WorkArea' && isAvailable && isDefault
		}
	)

	const handleOnEdit = async () => {
		if (!machineData.isActive) {
			return
		}
		router.push(
			`${CONFIGURATOR_PAGES.ACCESSORIES}?machineId=${machineData.id}&categoryId=${category}`
		)
	}

	const logoSrc = (typeof machineData.logo === 'string' && machineData.logo.length > 0)
		? machineData.logo
		: (machineData.logo?.src || '/img/grid-machines/icon-for-mini-equipment.png')

	return (
		<article className={styles.container}>
			<div className={styles['main-content']}>
				<div className={styles['main-content__img']}>
					<Image
						src={logoSrc}
						alt=''
						fill
						sizes='(max-width: 120px)'
						priority
					/>
				</div>
				<div
					className={`${styles['main-content__about']} ${styles['machine-about']}`}
				>
					<div className={styles['machine-about__info']}>
						<span className={styles.title}>
							<span>{machineData.name}</span>
							<span className={styles.price}>
								from ${machineData.startPrice}
							</span>
						</span>
						<span className={styles.description}>
							<span>{machineData.description}</span>
						</span>
					</div>
					<button
						className={`button-black ${styles['edit-btn']}`}
						onClick={handleOnEdit}
					>
						{translations.machines.edit_btn}
					</button>
				</div>
			</div>
			<div className={styles['area-sizes']}>
				<span className={styles['area-sizes__label']}>
					{translations.machines.area_sizes}
				</span>
				<span className={styles['area-sizes__values']}>
					{products.length > 0
						? products.map((prod) => (
							<Link
								key={prod.id}
								href={`/product/${prod.id}`}
								className={styles['area-value']}
							>
								<span className={styles['area-value__text']}>
									{formatProductModelName(prod.name)}
								</span>
							</Link>
						))
						: characteristicByWorkArea?.map(({ name }: any) => (
							<div
								key={name}
								className={styles['area-value']}
							>
								<span className={styles['area-value__text']}>{name}</span>
							</div>
						))}
				</span>
			</div>
		</article>
	)
}

export default MachinesItem
