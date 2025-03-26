import Button from '@components/ui/button/Button'
import onlineSupportImage from '@public/img/support/online-support-image.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.scss'
import { authorizedRequest } from '../../utils/request'
import { API_GET_SUPPORT_ABOUT_US } from '@constants/api'

const Page = async () => {
	const data = await authorizedRequest({
		url: API_GET_SUPPORT_ABOUT_US,
		method: 'GET'
	});

	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<div>
					<div className={styles.paragraph}>
						{data.descText}
					</div>
					<div className={clsx(styles.title)}>Immediate contact with us</div>
					<Link
						className={clsx(styles.link)}
						href={`tel:${data.contactUsPhone}`}
					>
						<div className={styles.icon}></div>
						{data.contactUsPhone}
					</Link>
					<Link
						className={styles.link}
						href={`mailto:${data.contactUsEmail}`}
					>
						<div className={styles.icon}></div>
						{data.contactUsEmail}
					</Link>
				</div>
				<div>
					<div className={styles.plate}>
						<div>
							<div className={clsx(styles.title)}>Online support</div>
							<div className={clsx(styles.plateParagraph)}>
								Get online consultations for expert guidance and personalized
								support from our ready team.
							</div>
							<Button
								size='l'
								view='red'
								href={data.onlineSupportLink}
							>
								Get a support
							</Button>
						</div>
						<div className={styles.image}>
							<Image
								src={onlineSupportImage}
								alt=''
								fill={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
