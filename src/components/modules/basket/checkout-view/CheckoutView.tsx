'use client'

import DeliveryMethod from '@components/modules/basket/delivery-method/DeliveryMethod'
import PaymentInfo from '@components/modules/basket/payment-info/PaymentInfo'
import Button from '@components/ui/button/Button'
import { FormSelect } from '@components/ui/inputs/form-select/headless-ui'
import { MODALS } from '@components/ui/modal/Modal'
import avatarSrc from '@public/img/account/user-avatar.png'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import { authStore } from '@store/auth'
import { basketStore as newBasketStore } from '@store/basket'
import { basketForm } from '@store/forms'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { FC } from 'react'

import styles from './CheckoutView.module.scss'

const CheckoutView: FC = () => {
	const handleLogin = () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onlyInitialScreen: true,
			onComplete: () => {
				modalsStore.set.close()
			}
		})
	}

	const handleSignUp = () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'SIGN_UP',
			closeOnEscape: false,
			onlyInitialScreen: false,
			onComplete: () => {
				modalsStore.set.close()
			}
		})
	}

	const authorized = authStore.use.authorized()

	const userInfo = authStore.useStore((state) => state.user)

	const countries = newBasketStore.use.countries()

	const { country } = basketForm.use.valuesSelector()

	return (
		<div>
			<Button
				className={styles.navigation}
				href='/basket'
				view='default'
				leftAddon={
					<Image
						src={arrowSrc}
						alt=''
					/>
				}
			>
				Back to Basket
			</Button>
			<div className={styles.title}>Checkout</div>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.plate}>
						<div className={styles.plateTitle}>Personal info</div>
						{authorized ? (
							<div className={styles.userInfo}>
								<div className={styles.name}>
									<div className={styles.image}>
										<Image
											src={avatarSrc}
											alt=''
											fill={true}
										/>
									</div>
									{userInfo.fullName ?? userInfo.firstName ?? "No name"}
								</div>
								<div className={styles.phone}>{userInfo.phone}</div>
								<div className={styles.email}>{userInfo.email}</div>
							</div>
						) : (
							<div className={styles.authActions}>
								<Button
									size='l'
									view='green'
									onClick={handleLogin}
								>
									Login
								</Button>
								<Button
									size='l'
									view='bordered'
									onClick={handleSignUp}
								>
									Sign up
								</Button>
							</div>
						)}
					</div>
					<div className={styles.plate}>
						<div className={styles.plateTitle}>Delivery method</div>
						<div className={styles.divider} />
						{authorized ? (
							<>
								<div className={styles.sectionTitle}>Country</div>
								<FormSelect
									className={styles.countrySelect}
									name='country'
									color='blue'
									bordered={true}
									placeholder='Select delivery country'
									value={country}
									options={countries.map(({ id, name }) => ({
										value: id,
										text: name
									}))}
									onSelect={selected => {
										console.log(selected, 'selected')
										basketForm.set.change('country', selected)
									}}
								/>
								{country === '' ? null : (
									<>
										<div className={styles.sectionTitle}>
											Choose delivery method
										</div>
										<div className={styles.paragraph}>
											Please note that the selected delivery method is
											preliminary. The delivery cost is paid separately and is
											not included in the total amount. After placing your
											order, a manager will contact you to confirm all delivery
											details.
										</div>
										<DeliveryMethod className={styles.deliveryMethod} />
									</>
								)}
							</>
						) : (
							<div className={styles.paragraph}>
								Please log in or create a new account before choosing a delivery
								method.
							</div>
						)}
					</div>
					<div className={styles.plate}>
						<div className={styles.plateTitle}>Payment method</div>
						<div className={styles.divider} />
						{authorized ? (
							<div className={styles.paragraph}>
								After placing your order, our manager will reach out to discuss
								the most convenient payment method for you. Once agreed upon,
								you'll be able to proceed with payment for your order.
							</div>
						) : (
							<div className={styles.paragraph}>
								Please log in or create a new account before choosing a delivery
								method.
							</div>
						)}
					</div>
				</div>
				<PaymentInfo
					disabled={!authorized}
					view='payment'
				/>
			</div>
		</div>
	)
}

export default CheckoutView
