import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import { PHONE_CODES } from '@constants/phone-codes'
import { useEffect, useMemo, useState } from 'react'

import styles from './FormPhone.module.scss'
import { FlagIcon } from './components/FlagIcon'

const CountryIcon = ({ country }) => {
	return <FlagIcon country={country?.toLowerCase()} />
}

export const FormPhone = ({
	className,
	name,
	label,
	placeholder,
	defaultCountry = 'DE'
}) => {
	const [value, setValue] = useState('')
	const [country, setCountry] = useState(null)

	// const countryMask = PHONE_CODES.find(({  }) => )

	useEffect(() => {
		setCountry(defaultCountry)
	}, [defaultCountry])

	const handleSelect = selected => {
		console.log(selected)
	}

	const options = useMemo(() => {
		return PHONE_CODES.map(({ code, name, phone }) => {
			return {
				id: code,
				value: phone,
				content: (
					<div className={styles.option}>
						{name}&nbsp;({phone})
					</div>
				)
			}
		})
	}, [])

	return (
		<FormAutocomplete
			className={className}
			name={name}
			label={label}
			placeholder={placeholder}
			value={value}
			color='blue'
			options={options}
			leftAddon={<CountryIcon country={country} />}
			onSelect={handleSelect}
		/>
	)
}
