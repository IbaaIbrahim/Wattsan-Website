import FormTextarea from '@components/ui/form-textarea/FormTextarea'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import { useState } from 'react'

import styles from './RequestSupportModal.module.scss'

const RequestSupportModal = () => {
	const [reason, setReason] = useState('')
	const [description, setDescription] = useState('')

	return (
		<>
			<div className={styles.title}>New support request</div>
			<div className={styles.subtitle}>Request theme</div>
			<FormSelect
				className={styles.select}
				label=''
				bordered={true}
				placeholder='Select request theme'
				value={reason}
				options={[
					{ text: 'Payment issues', value: '01' },
					{ text: 'Delivery inquiries', value: '02' },
					{ text: 'Technical website problems', value: '03' },
					{ text: 'Returns and exchanges', value: '04' },
					{ text: 'Product information', value: '05' },
					{ text: 'Account assistance', value: '06' }
				]}
				onSelect={setReason}
			/>
			<div className={styles.subtitle}>Describe your request in detail</div>
			<FormTextarea
				name='description'
				value={description}
				label='Message'
				placeholder='Write your message'
				onChange={setDescription}
			/>
		</>
	)
}

export default RequestSupportModal
