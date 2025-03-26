import downloadIcon from '@public/img/icons/download.svg'
import Image from 'next/image'

import styles from './DownloadFile.module.scss'

const DownloadFile = ({ file }) => {
	return (
		<button className={styles.plate}>
			<div className={styles.image}>
				<Image
					src={file.icon}
					alt=''
					fill={true}
				/>
			</div>
			<div>
				<div className={styles.name}>{file.name}</div>
				<div className={styles.system}>{file.system}</div>
			</div>
			<div className={styles.downloadIcon}>
				<Image
					src={downloadIcon}
					alt=''
				/>
			</div>
		</button>
	)
}

export default DownloadFile
