import { AuthModalContext } from '@components/modules/auth/context'
import Button from '@components/ui/button/Button'
import FormCode from '@components/ui/inputs/form-code/FormCode'
import { Typography } from '@components/ui/typography/Typography'
import leftArrowIcon from '@public/img/icons/arrow-left.svg'
import Image from 'next/image'
import { useContext } from 'react'

import styles from './ConfirmationCode.module.scss'

const ConfirmationCode = () => {
	const authModalContext = useContext(AuthModalContext)

	const handleBack = () => {
		authModalContext.onChangeScreen(
			authModalContext.prevScreen === 'LOGIN' ? 'LOGIN' : 'SIGN_UP'
		)
	}

	return (
		<div className={styles.confirmation}>
			<button
				className={styles.back}
				onClick={handleBack}
			>
				<Image
					src={leftArrowIcon}
					alt=''
				/>
			</button>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Verification code sent
			</Typography>
			<Typography
				className={styles.description}
				tag='p'
				size='m'
				weight='regular'
			>
				Enter the received code to complete logging into your personal account.
			</Typography>
			<FormCode
				className={styles.codeField}
				fields={6}
				code={authModalContext.code}
				error={authModalContext.state === 'ERROR' && 'Code verification error'}
				disabled={authModalContext.state === 'PROCESSING'}
				onComplete={authModalContext.onInputFinished}
			/>
			{authModalContext.timeLeft !== 0 ? (
				<Typography
					className={styles.requestNewCode}
					tag='p'
					size='m'
					weight='regular'
					discolored={true}
				>
					Request a new code in 00:{authModalContext.timeLeft}
				</Typography>
			) : (
				<Button
					className={styles.requestNewCode}
					size='l'
					view='bordered'
					disabled={authModalContext.state === 'PROCESSING'}
					onClick={authModalContext.onSmsRetryClick}
				>
					Request a new code
				</Button>
			)}
		</div>
	)
}

export default ConfirmationCode
