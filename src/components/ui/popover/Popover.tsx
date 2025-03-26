import { BasePlacement, VariationPlacement } from '@popperjs/core'
import clsx from 'clsx'
import { FC, ReactNode, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

import styles from './Popover.module.scss'

const Popover: FC<{
	visible: boolean
	target: any
	placement: BasePlacement | VariationPlacement
	offset?: number[]
	children: ReactNode
}> = ({ visible, target, children, offset = [0, 8], placement }) => {
	const [popperElement, setPopperElement] = useState(null)

	const {
		styles: popperStyles,
		attributes,
		update
	} = usePopper(target, popperElement, {
		placement,
		modifiers: [{ name: 'offset', options: { offset: offset as any } }]
	})

	useEffect(() => {
		update?.()
	}, [visible, update])

	return (
		<div
			ref={setPopperElement}
			className={clsx(styles.popover, visible && styles.visible)}
			style={popperStyles.popper}
			{...attributes.popper}
		>
			{children}
		</div>
	)
}

export default Popover
