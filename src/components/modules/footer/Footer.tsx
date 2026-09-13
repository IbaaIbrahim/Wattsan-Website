'use client'

import Logo from '@components/ui/logo/Logo'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Footer.module.scss'

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.topGrid}>
					<div className={styles.brandCol}>
						<div className={styles.logoWrapper}>
							<Logo size='m' />
						</div>
						<p className={styles.disclaimer}>
							Wattsan CNC manufactures and distributes high-performance industrial laser cutters, engravers, and CNC routers. All specifications and offers on this website are subject to confirmation.
						</p>
					</div>

					<div className={styles.linksCol}>
						<div className={styles.colTitle}>Company</div>
						<ul className={styles.linksList}>
							<li><Link href='/'>About Wattsan</Link></li>
							<li><Link href='/support'>Knowledge Base</Link></li>
							<li><Link href='/'>Customer Stories</Link></li>
							<li><Link href='/support'>Payment & Delivery</Link></li>
							<li><Link href='/support'>Service & Warranty</Link></li>
							<li><Link href='/support'>Contacts</Link></li>
						</ul>
					</div>

					<div className={styles.linksCol}>
						<div className={styles.colTitle}>Laser Equipment</div>
						<ul className={styles.linksList}>
							<li><Link href='/product/laser-co2'>CO2 Non-Metal Lasers</Link></li>
							<li><Link href='/configurator'>Fiber Laser Markers</Link></li>
							<li><Link href='/configurator'>Tube Laser Cutters</Link></li>
							<li><Link href='/configurator'>Fiber Sheet Metal Lasers</Link></li>
							<li><Link href='/configurator'>Handheld Laser Welding</Link></li>
							<li><Link href='/configurator'>Laser Cleaning Systems</Link></li>
						</ul>
					</div>

					<div className={styles.linksCol}>
						<div className={styles.colTitle}>Milling & Accessories</div>
						<ul className={styles.linksList}>
							<li><Link href='/product/cnc-router'>CNC Routers (Milling)</Link></li>
							<li><Link href='/accessories'>Spindles & Motors</Link></li>
							<li><Link href='/accessories'>Rotary Attachments</Link></li>
							<li><Link href='/accessories'>Laser Tubes & Power Units</Link></li>
							<li><Link href='/accessories'>Industrial Water Chillers</Link></li>
							<li><Link href='/accessories'>Aspiration Systems</Link></li>
						</ul>
					</div>

					<div className={styles.contactsCol}>
						<div className={styles.colTitle}>Contacts & Support</div>
						<div className={styles.contactItem}>
							<span className={styles.contactLabel}>Customer support:</span>
							<a href='tel:+18005550199' className={styles.contactLink}>+1 (800) 555-0199</a>
						</div>
						<div className={styles.contactItem}>
							<span className={styles.contactLabel}>Inquiries & Sales:</span>
							<a href='mailto:info@wattsancnc.com' className={styles.contactLink}>info@wattsancnc.com</a>
						</div>
						<div className={styles.workingHours}>
							Mon – Fri: 9:00 AM – 6:00 PM EST
						</div>
					</div>
				</div>

				<div className={styles.bottomBar}>
					<div className={styles.copyright}>
						© 2009–2025 Wattsan CNC Inc. All rights reserved.
					</div>
					<div className={styles.legalLinks}>
						<Link href='/'>Personal Data Processing Agreement</Link>
						<Link href='/'>Privacy Policy</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
