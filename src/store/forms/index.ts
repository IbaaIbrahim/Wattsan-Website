import { FORMS } from '@constants/forms'
import { isNil, mergeDeepLeft } from 'ramda'
import { createStore } from 'zustand-x'

import { firstPass } from '../../utils/helpers'
import { numberNormalizer } from '../../utils/normalizers/number-normalizer'
import { emailValidator } from '../../utils/validators/email-validator'
import { required } from '../../utils/validators/required'

export type TFieldValue = string | number | boolean | any[]

export type TForm = {
	fields: {
		[key: string]: {
			value: TFieldValue
			error?: string | null
		}
	}
	validators: {
		[key: string]: ((val) => string | null)[]
	}
}

export const createFormStore = (
	name: string,
	fields: {
		[key: string]: {
			value: TFieldValue
			validators?: ((val) => string | null)[]
			normalizer?: (val) => string
		}
	}
) => {
	const parsedValidators = {}
	const parsedFields = Object.fromEntries(
		Object.entries(fields).reduce((acc, [name, { value, validators = [] }]) => {
			parsedValidators[name] = validators

			return [...acc, [name, { value, error: null }]]
		}, [])
	)

	return createStore(name)<TForm>({
		fields: parsedFields,
		validators: parsedValidators
	})
		.extendActions((set, get) => ({
			change: (name: string, value: any) => {
				const normalizedValue = fields?.[name]?.normalizer?.(value) ?? value

				set.fields(
					mergeDeepLeft(
						{ [name]: { value: normalizedValue, error: null } },
						get.fields()
					)
				)
			},
			blur: (name: string) => {
				const value = get.fields()[name].value
				const validators = get.validators()[name]

				const errors = validators
					.map(validator => validator(value))
					.filter(error => error !== null)

				set.fields(
					mergeDeepLeft(
						{ [name]: { error: errors?.[0] ?? null } },
						get.fields()
					)
				)
			},
			multiple: (fields: { [key: string]: { value: TFieldValue } }) => {
				set.fields(mergeDeepLeft(fields, get.fields()))
			},
			filter: (name: string, value: TFieldValue) => {
				const currentValue = get.fields()?.[name]?.value ?? ([] as any)
				let newValue = null

				if (value === 'all') {
					newValue = ['all']
				} else if (currentValue.includes(value)) {
					newValue = currentValue.filter(val => val !== value)

					if (newValue.length === 0) newValue = ['all']
				} else {
					newValue = currentValue.concat(value)
					newValue = newValue.filter(val => val !== 'all')
				}

				set.fields(mergeDeepLeft({ [name]: { value: newValue } }, get.fields()))
			},
			validate: () => {
				const fields = get.fields()
				const validators = get.validators() ?? {}

				const fieldsWithErrors: any = Object.entries(fields).reduce(
					(acc, [name, { value }]) => {
						const errors = (validators?.[name] ?? []).map(validator =>
							validator(value)
						)

						const error = firstPass(errors)

						return {
							...acc,
							[name]: {
								error,
								value
							}
						}
					},
					{}
				)

				set.fields(mergeDeepLeft(fieldsWithErrors, get.fields()))

				return Object.values(fieldsWithErrors).every(({ error }) =>
					isNil(error)
				)
			},
			reset: () => {
				set.fields(parsedFields)
			}
		}))
		.extendSelectors((set, get) => ({
			valuesSelector: () =>
				Object.fromEntries(
					Object.entries(get.fields()).map(([name, { value }]) => [name, value])
				),
			errorsSelector: () => {
				return Object.fromEntries(
					Object.entries(get.fields()).map(([name, { error = null }]) => [
						name,
						error
					])
				)
			},
			validFormSelector: () => {
				return Object.values(get.fields()).every(({ error }) => isNil(error))
			}
		}))
}

export const loginForm = createFormStore(FORMS.login, {
	email: { value: '', validators: [required()] },
	rememberMe: { value: true, validators: [required()] }
})

export const signUpForm = createFormStore(FORMS.login, {
	fullName: { value: '', validators: [required()] },
	// fullName: { value: 'test', validators: [required()] },
	phone: {
		value: '',
		validators: [required()],
		normalizer: numberNormalizer
	},
	// phone: {
	// 	value: '9999',
	// 	validators: [required()],
	// 	normalizer: numberNormalizer
	// },
	email: { value: '', validators: [required(), emailValidator()] },
	// email: {
	// 	value: 'seryi.zadorin@gmail.com',
	// 	validators: [required(), emailValidator()]
	// },
	activationType: { value: 1, validators: [required()] },
	subscriptions: { value: false, validators: [] },
	agreePolicy: { value: false, validators: [required()] }
})

export const equipmentCategoryForm = createFormStore(FORMS.equipmentCategory, {
	category: { value: '' }
})

export const equipmentFiltersForm = createFormStore(FORMS.equipmentFilters, {
	workAreaFilter: { value: ['all'] }
})

export const machineConfigurationForm = createFormStore(
	FORMS.machineConfiguration,
	{
		workAreaCharacteristics: { value: '' },
		zAxisCharacteristics: { value: '' },
		toolswithchCharacteristics: { value: '' },
		spindleCharacteristics: { value: '' },
		spindleQuantityCharacteristics: { value: '' },
		motorCharacteristics: { value: '' },
		controlSystemCharacteristics: { value: '' },
		liquidCoolingSystemCharacteristics: { value: '' },
		removableSensorCharacteristics: { value: '' },
		builtInSensorCharacteristics: { value: '' },
		lubricationSystemCharacteristics: { value: '' },
		aspirationCharacteristics: { value: '' },
		vaccumTableCharacteristics: { value: '' },
		rotaryDeviceCharacteristics: { value: '' },
		rotarySeparateCharacteristics: { value: '' },
		cabineCharacteristics: { value: '' },
		autoChangeToolsRelations: {value: ''}
	}
)

export const basicMachineConfigurationForm = createFormStore(
	FORMS.basicMachineConfiguration,
	{
		workAreaCharacteristics: { value: '' },
		zAxisCharacteristics: { value: '' },
		toolswithchCharacteristics: { value: '' },
		spindleCharacteristics: { value: '' },
		spindleQuantityCharacteristics: { value: '' },
		motorCharacteristics: { value: '' },
		controlSystemCharacteristics: { value: '' },
		liquidCoolingSystemCharacteristics: { value: '' },
		removableSensorCharacteristics: { value: '' },
		builtInSensorCharacteristics: { value: '' },
		lubricationSystemCharacteristics: { value: '' },
		aspirationCharacteristics: { value: '' },
		vaccumTableCharacteristics: { value: '' },
		rotaryDeviceCharacteristics: { value: '' },
		cabineCharacteristics: { value: '' },
		autoChangeToolsRelations: {value: ''}
	}
)

export const basketForm = createFormStore(FORMS.basket, {
	country: { value: '' },
	deliveryMethod: { value: '' },
	promoCode: { value: '' }
})
