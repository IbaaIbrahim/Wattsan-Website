'use client'

import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import { API_GET_CHECK_COUPON, API_ORDERS_CREATE } from '@constants/api'
import deleteIcon from '@public/img/icons/delete-icon.svg'
import promoInfo from '@public/img/icons/promo-info.svg'
import { basketStore } from '@store/basket'
import { checkCoupon, createOrder } from '@store/basket/actions'
import { basketForm } from '@store/forms'
import { STATUSES, requestsStore } from '@store/requests'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import styles from './PaymentInfo.module.scss'

const PaymentInfo: FC<{
	disabled: boolean
	view: 'preview' | 'payment'
}> = ({ disabled, view }) => {
	const router = useRouter()

	const loading = requestsStore.use.loadingSelector(API_ORDERS_CREATE)
	const promoCodeLoading =
		requestsStore.use.loadingSelector(API_GET_CHECK_COUPON)
	const promoCodeError =
		requestsStore.use.statusSelector(API_GET_CHECK_COUPON) === STATUSES.failure

	const positions = basketStore.use.positions()
	const deliveryMethodName = basketStore.use.deliveryMethodNameSelector()
	const totalPrice = basketStore.use.totalPriceSelector()
	const mainPriceSelector = basketStore.use.mainPriceSelector()
	const appliedPromoCode = basketStore.use.appliedPromoCode()
	const aa = basketStore.useStore(x => x)
	const promoDiscount = basketStore.use.promoDiscount()
	const countries = basketStore.use.countries()

	const selectedPositions = positions.reduce(
		(acc, el) => (el.selected ? acc + el?.quantity : acc),
		0
	)

	const discountPercent = ((promoDiscount / totalPrice) * 100).toFixed(0)

	const { country, deliveryMethod, promoCode } = basketForm.use.valuesSelector()

	const paymentAvailable = !!deliveryMethod && !!country

	const countryName = countries.find(({ id }) => country === id)?.name

	const handleCreateOrder = () => {
		createOrder(router)
	}

	const handleCheckCoupon = () => {
		checkCoupon(totalPrice)
	}

	return (
		<div className={styles.plate}>
			<div className={styles.title}>The order total</div>
			<div>
				{view === 'payment' && paymentAvailable && (
					<div className={styles.deliveryInfo}>
						<div className={styles.deliveryTitle}>Delivery method</div>
						<div className={styles.deliveryMethod}>
							{deliveryMethodName}
							<div>{countryName}</div>
						</div>
					</div>
				)}
				<div className={styles.calculation}>
					<div className={styles.counter}>{selectedPositions}&nbsp;items</div>
					<div className={styles.amount}>${mainPriceSelector}</div>
					{promoDiscount === 0 ? null : (
						<>
							<div className={styles.counter}>Discount</div>
							<div className={styles.discount}>
								${promoDiscount}
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
						${totalPrice}
						{view === 'payment' && !deliveryMethodName && (
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
							disabled={!paymentAvailable || disabled || loading}
							onClick={handleCreateOrder}
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
								disabled={disabled || promoCodeLoading}
								onChange={value => basketForm.set.change('promoCode', value)}
							/>
							<Button
								view='blue'
								size='l'
								disabled={
									(promoCode as string).length === 0 ||
									disabled ||
									promoCodeLoading
								}
								onClick={handleCheckCoupon}
							>
								Apply
							</Button>
						</div>
						{promoDiscount !== 0 && (
							<div className={styles.codeApplied}>
								The promo code&nbsp;{appliedPromoCode}&nbsp;has been applied
								{/*TODO Заменить иконку*/}
								<button
									className={styles.deletePromoCode}
									onClick={() => {
										basketStore.set.promoDiscount(0)
										basketForm.set.change('promoCode', '')
									}}
								>
									<Image
										src={deleteIcon}
										alt=''
									/>
								</button>
							</div>
						)}
						{promoCodeError && (
							<div className={styles.codeApplied}>
								The promo code&nbsp;{appliedPromoCode}&nbsp;incorrect
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default PaymentInfo
