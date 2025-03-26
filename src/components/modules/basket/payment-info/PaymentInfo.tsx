'use client'

import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import basketIcon from '@public/img/icons/basket.svg'
import promoInfo from '@public/img/icons/promo-info.svg'
import { basketStore } from '@store/basketStore'
import Image from 'next/image'
import { FC } from 'react'

import styles from './PaymentInfo.module.scss'

const PaymentInfo: FC<{
	disabled: boolean
	view: 'preview' | 'payment'
}> = ({ disabled, view }) => {
	const {
		items,
		promoCode,
		changePromoCode,
		appliedPromoCode,
		applyPromoCode,
		deliveryMethod,
		selectedCountry,
		checkoutInfo
	} = basketStore(
		({
			items,
			promoCode,
			changePromoCode,
			appliedPromoCode,
			applyPromoCode,
			deliveryMethod,
			selectedCountry,
			checkoutInfo
		}) => ({
			items,
			promoCode,
			changePromoCode,
			appliedPromoCode,
			applyPromoCode,
			deliveryMethod,
			selectedCountry,
			checkoutInfo
		})
	)

	const selected = items.filter(({ selected }) => selected)
	const amount = selected
		.map(({ price, quantity }) => price * quantity)
		.reduce((acc, value) => acc + value, 0)
	const discount = selected
		.map(({ discount, quantity }) => discount * quantity)
		.reduce((acc, value) => acc + value, 0)
	const discountPercent = ((discount / amount) * 100).toFixed(0)
	const total = amount - discount
	const method = checkoutInfo.deliveryMethods.find(
		({ id }) => deliveryMethod === id
	)?.name
	const country = checkoutInfo.countries.find(
		({ id }) => selectedCountry === id
	)?.text
	const paymentAvailable = !!method && !!country

	return (
		<div className={styles.plate}>
			<div className={styles.title}>The order total</div>
			<div>
				{view === 'payment' && deliveryMethod && selectedCountry && (
					<div className={styles.deliveryInfo}>
						<div className={styles.deliveryTitle}>Delivery method</div>
						<div className={styles.deliveryMethod}>
							{method}
							<div>{country}</div>
						</div>
					</div>
				)}
				<div className={styles.calculation}>
					<div className={styles.counter}>{selected.length}&nbsp;items</div>
					<div className={styles.amount}>${amount}</div>
					{discount === 0 ? null : (
						<>
							<div className={styles.counter}>Discount</div>
							<div className={styles.discount}>
								-{discount}
								<div className={styles.discountPercent}>
									-{discountPercent}%
								</div>
							</div>
						</>
					)}
				</div>
				<div className={styles.divider} />
				<div className={styles.result}>
					<div className={styles.resultTitle}>Total</div>
					<div className={styles.resultAmount}>
						${total}
						{view === 'payment' && !disabled && (
							<div className={styles.resultAmountInfo}>
								Delivery not included
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				{view === 'payment' && !disabled && (
					<div className={styles.paymentInfo}>
						<Image
							src={promoInfo}
							alt=''
						/>
						<div>
							Payment will be available after manager confirmation; delivery
							cost not included at the moment, and will be calculated by manager
							within 1-2 days.
						</div>
					</div>
				)}
				{view === 'preview' ? (
					<Button
						className={styles.createOrder}
						view='green'
						size='l'
						href='/checkout'
						disabled={disabled}
					>
						Proceed to checkout
					</Button>
				) : (
					<>
						<Button
							className={styles.createOrder}
							view={paymentAvailable ? 'green' : 'blue'}
							size='l'
							disabled={!paymentAvailable || disabled}
							href='/checkout/1001'
						>
							{paymentAvailable
								? 'Place an order'
								: 'Checkout after delivery selection'}
						</Button>
						<div className={styles.promo}>
							<Input
								value={promoCode}
								placeholder='Promo code'
								hasBorder={false}
								disabled={disabled}
								onChange={changePromoCode}
							/>
							<Button
								view='blue'
								size='l'
								disabled={promoCode.length === 0 || disabled}
								onClick={() => {
									applyPromoCode(promoCode)
									changePromoCode('')
								}}
							>
								Apply
							</Button>
						</div>
						{appliedPromoCode.length > 0 && (
							<div className={styles.codeApplied}>
								The promo code&nbsp;{appliedPromoCode}&nbsp;has been applied
								{/*TODO Заменить иконку*/}
								<button
									className={styles.deletePromoCode}
									onClick={() => {
										applyPromoCode('')
									}}
								>
									<Image
										src={basketIcon}
										alt=''
									/>
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default PaymentInfo
