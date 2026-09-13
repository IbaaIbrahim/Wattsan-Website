'use client'

import CatalogSidebar from '@components/modules/header/catalog-sidebar/CatalogSidebar'
import Catalog from '@components/modules/header/catalog/Catalog'
import ConfiguratorMenu from '@components/modules/header/configurator-menu/ConfiguratorMenu'
import MenuSidebar from '@components/modules/header/menu-sidebar/MenuSidebar'
import Button from '@components/ui/button/Button'
import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import Tooltip from '@components/ui/tooltip/Tooltip'
import { AllowedLangs } from '@constants/allowedLangs'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import config from '@public/img/icons/config.svg'
import rightArrow from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { PAGES } from '../../../config/pages.url.config'
import Logo from '../../ui/logo/Logo'

import styles from './Header.module.scss'
import { uiStore } from '@store/uiStore'
import LocaleDd from './locale-dd/Locale-dd'
import Navigation from './navigation/Navigation'
import PersonalDd from './personal-dd/Personal-dd'

// TODO Скрыть каталог для конфигуратора
const Header = () => {
	const pathname = usePathname()
	const router = useRouter()
	const [searchQuery, setSearchQuery] = useState<string>('')

	const isConfiguratorPage =
		pathname === '/configurator' ||
		pathname.includes('accessories') ||
		pathname.includes('summary')

	const [openCompanyMenu, setOpenCompanyMenu] = useState<boolean>(false)
	const [openSupportMenu, setSupportMenu] = useState<boolean>(false)
	const [openCatalog, setOpenCatalog] = useState<boolean>(false)

	const isMenuSidebarOpen = uiStore.use.isMenuSidebarOpen()
	const isCatalogSidebarOpen = uiStore.use.isCatalogSidebarOpen()

	const [configuratorMenuOpen, changeConfiguratorMenuOpen] =
		useState<boolean>(false)

	const {
		lang,
		translations,
		changeLang
	}: {
		lang: AllowedLangs
		translations: ILanguage
		changeLang: (newLanguage: AllowedLangs) => void
	} = useLang()

	const langOptions = Object.keys(translations.languages).map(lang => ({
		value: lang,
		text: translations.languages[lang]
	}))

	return (
		<div
			className={clsx(
				styles.header,
				isConfiguratorPage && styles.headerConfigurator
			)}
		>
			<div className={styles.container}>
				{!isConfiguratorPage && (
					<div className={styles.mobileNavigation}>
						<Logo size='s' />
						<Button
							className={styles.mobileNavigationButton}
							size='m'
							view='black'
							leftAddon={<div className={styles.catalogButtonIcon} />}
							onClick={() => uiStore.set.isCatalogSidebarOpen(true)}
						>
							Catalog
						</Button>
					</div>
				)}
				{isConfiguratorPage ? (
					<div className={styles.configuratorNavigation}>
						<Logo size='m' />
						<Link
							className={styles.configuratorNavigationLink}
							href='/'
						>
							Go home
						</Link>
					</div>
				) : (
					<article className={clsx(styles.content, styles.navigation)}>
						{/*<Tooltip*/}
						{/*	trigger={false}*/}
						{/*	opened={openCompanyMenu}*/}
						{/*	placement='bottom-start'*/}
						{/*	offset={[-24, 8]}*/}
						{/*	content={*/}
						{/*		<div className={styles.navigationMenuList}>*/}
						{/*			<button className={styles.navigationMenuLink}>*/}
						{/*				Production process*/}
						{/*			</button>*/}
						{/*			<button className={styles.navigationMenuLink}>*/}
						{/*				Dealership*/}
						{/*			</button>*/}
						{/*			<button className={styles.navigationMenuLink}>Blog</button>*/}
						{/*		</div>*/}
						{/*	}*/}
						{/*	onToggle={open => setOpenCompanyMenu(open)}*/}
						{/*>*/}
						{/*	<button*/}
						{/*		className={styles.navigationButton}*/}
						{/*		onClick={() => setOpenCompanyMenu(!openCompanyMenu)}*/}
						{/*	>*/}
						{/*		Company*/}
						{/*		<div*/}
						{/*			className={clsx(*/}
						{/*				styles.navigationButtonIcon,*/}
						{/*				openCompanyMenu && styles.navigationButtonIconRotate*/}
						{/*			)}*/}
						{/*		>*/}
						{/*			<Image*/}
						{/*				src={rightArrow}*/}
						{/*				alt=''*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*	</button>*/}
						{/*</Tooltip>*/}
						<Tooltip
							trigger={false}
							opened={openSupportMenu}
							placement='bottom-start'
							offset={[-24, 8]}
							content={
								<div className={styles.navigationMenuList}>
									<Link
										href={PAGES.support}
										className={styles.navigationMenuLink}
									>
										About
									</Link>
									<Link
										href={PAGES.training}
										className={styles.navigationMenuLink}
									>
										Training, drivers, and files
									</Link>
									{/*<Link*/}
									{/*	href={PAGES.faq}*/}
									{/*	className={styles.navigationMenuLink}*/}
									{/*>*/}
									{/*	FAQ*/}
									{/*</Link>*/}
								</div>
							}
							onToggle={open => setSupportMenu(open)}
						>
							<button
								className={styles.navigationButton}
								onClick={() => setSupportMenu(!openSupportMenu)}
							>
								Support
								<div
									className={clsx(
										styles.navigationButtonIcon,
										openSupportMenu && styles.navigationButtonIconRotate
									)}
								>
									<Image
										src={rightArrow}
										alt=''
									/>
								</div>
							</button>
						</Tooltip>
						{/*<Link*/}
						{/*	href={PAGES.checkEquipment}*/}
						{/*	className={styles.navigationButton}*/}
						{/*>*/}
						{/*	Check equipment*/}
						{/*</Link>*/}
						{/*<button className={styles.navigationButton}>Contacts</button>*/}
					</article>
				)}
				<article className={styles.content}>
					<LocaleDd />
					<Navigation />
					<PersonalDd
						configuratorMenuOpen={configuratorMenuOpen}
						onOpenMenu={() =>
							isConfiguratorPage
								? changeConfiguratorMenuOpen(!configuratorMenuOpen)
								: uiStore.set.isMenuSidebarOpen(true)
						}
					/>
				</article>
			</div>
			{!isConfiguratorPage && (
				<div className={styles.catalogWrapper}>
					<Logo
						className={styles.catalogLogo}
						size='l'
					/>
					<div className={styles.catalogForm}>
						<Tooltip
							opened={openCatalog}
							trigger={false}
							placement='bottom-start'
							offset={[0, 8]}
							onToggle={setOpenCatalog}
							content={<Catalog onClose={() => setOpenCatalog(false)} />}
						>
							<Button
								size='l'
								view='black'
								leftAddon={<div className={styles.catalogButtonIcon} />}
								onClick={() => setOpenCatalog(!openCatalog)}
							>
								Catalog
							</Button>
						</Tooltip>
						<FormAutocomplete
							className={styles.catalogFormSearch}
							name='catalogSearch'
							value={searchQuery}
							onChange={setSearchQuery}
							onKeyDown={e => {
								if (e.key === 'Enter' && searchQuery.trim()) {
									router.push(
										`/search-results?search=${encodeURIComponent(searchQuery.trim())}`
									)
								}
							}}
							onSelect={option => {
								if (option?.value) {
									router.push(
										`/search-results?search=${encodeURIComponent(option.value)}`
									)
								}
							}}
							size='l'
							placeholder='Search items'
						/>
					</div>
					<Button
						className={styles.configuratorButton}
						href={PAGES.configurator}
						size='l'
						view='bordered'
						leftAddon={
							<div className={styles.configuratorButtonIcon}>
								<Image
									src={config}
									alt=''
								/>
							</div>
						}
					>
						Configurator
					</Button>
				</div>
			)}
			<ConfiguratorMenu
				lang={lang}
				options={langOptions}
				changeLang={changeLang}
				open={configuratorMenuOpen}
				onToggle={changeConfiguratorMenuOpen}
			/>
			<CatalogSidebar
				open={isCatalogSidebarOpen}
				onToggle={uiStore.set.isCatalogSidebarOpen}
			/>
			<MenuSidebar
				lang={lang}
				options={langOptions}
				changeLang={changeLang}
				open={isMenuSidebarOpen}
				onToggle={uiStore.set.isMenuSidebarOpen}
			/>
		</div>
	)
}

export default Header
