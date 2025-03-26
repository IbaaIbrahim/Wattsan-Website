import { FC, ReactNode } from 'react'

export const Form: FC<{ onSubmit?: () => void; children: ReactNode }> = ({
	onSubmit,
	children
}) => {
	const handleSubmit = event => {
		event?.preventDefault()

		onSubmit?.()
	}

	return <form onSubmit={handleSubmit}>{children}</form>
}
