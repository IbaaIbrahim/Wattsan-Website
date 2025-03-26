import Button from '@components/ui/button/Button'
import pdfSrc from '@public/img/icons/pdf.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OrderDownloadModal.module.scss'

const OrderDownloadModal: FC<{ file: { name: string; title: string } }> = ({
	file
}) => {
	const { name, title } = file

	return (
		<div>
			<div className={styles.title}>Download receipt</div>
			<div className={styles.description}>
				Download the invoice with the details of your order.
			</div>
			<div className={styles.file}>
				<Image
					src={pdfSrc}
					alt=''
				/>
				<div>
					<div className={styles.fileTitle}>{title}</div>
					<div className={styles.fileName}>{name}</div>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					block={true}
					size='l'
					view='black'
				>
					Download
				</Button>
				<Button
					block={true}
					size='l'
					view='bordered'
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default OrderDownloadModal
