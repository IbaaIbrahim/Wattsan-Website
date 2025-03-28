'use client'

import Popover from '@components/ui/popover/Popover'
import { BasePlacement, VariationPlacement } from '@popperjs/core'
import { usePathname } from 'next/navigation'
import {
	CSSProperties,
	FC,
	ReactNode,
	TouchEvent,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

const DELAY = 300

const Tooltip: FC<{
	targetClassName?: string
	targetStyle?: CSSProperties
	opened?: boolean
	children: ReactNode
	content: ReactNode
	contentClassName?: string
	trigger?: 'click' | 'hover' | 'outsideClick' | boolean
	placement: BasePlacement | VariationPlacement
	offset?: number[]
	onToggle?: (visible: boolean) => void
}> = ({
	targetClassName,
	targetStyle,
	opened = null,
	children,
	content,
	contentClassName,
	trigger = 'click',
	placement,
	offset,
	onToggle
}) => {
	const pathname = usePathname()

	const [visible, setVisible] = useState(false)
	const [target, setTarget] = useState<HTMLElement | null>(null)

	const timer = useRef(0)

	useEffect(() => {
		if (opened !== null) {
			setVisible(opened)
		}
	}, [opened])

	const contentRef = useRef(null)

	const open = useCallback(() => {
		setVisible(true)

		onToggle?.(true)
	}, [onToggle])

	const close = useCallback(() => {
		setVisible(false)

		onToggle?.(false)
	}, [onToggle])

	const handleClick = () => {
		visible ? close() : open()
	}

	const handleMouseOver = () => {
		clearTimeout(timer.current)

		timer.current = window.setTimeout(() => {
			open()
		}, DELAY)
	}

	const handleMouseOut = () => {
		clearTimeout(timer.current)

		timer.current = window.setTimeout(() => {
			close()
		}, DELAY)
	}

	const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
		const eventTarget = event.target as Element

		clearTimeout(timer.current)

		if (clickedOutside(eventTarget)) {
			timer.current = window.setTimeout(() => {
				close()
			}, DELAY)
		} else {
			open()
		}
	}

	const onHoverProps = {
		onMouseOver: handleMouseOver,
		onMouseOut: handleMouseOut,
		onTouchStart: handleTouchStart
	}

	const getTargetProps = () => {
		const props = {
			className: targetClassName,
			style: targetStyle
		}

		if (trigger === 'click') return { ...props, onClick: handleClick }
		if (trigger === 'hover') return { ...props, ...onHoverProps }
		return props
	}

	const getContentProps = () => {
		const props = {
			className: contentClassName
		}

		if (trigger === 'hover') return { ...props, ...onHoverProps }

		return props
	}

	const clickedOutside = useCallback(
		(node: Element): boolean => {
			if (!trigger) return false

			if (target && target.contains(node)) {
				return false
			}

			return !(contentRef.current && contentRef.current.contains(node))
		},
		[target, trigger]
	)

	useEffect(() => {
		const handleBodyClick = event => {
			const eventTarget = event.target as Element

			if (clickedOutside(eventTarget)) {
				close()
			}
		}

		document.body.addEventListener('click', handleBodyClick)
		document.body.addEventListener('touchstart', handleBodyClick)

		return () => {
			document.body.removeEventListener('click', handleBodyClick)
			document.body.removeEventListener('touchstart', handleBodyClick)

			clearTimeout(timer.current)
		}
	}, [clickedOutside, close])

	useEffect(() => {
		close()
	}, [pathname])

	return (
		<>
			<div
				ref={setTarget}
				{...getTargetProps()}
			>
				{children}
			</div>
			<Popover
				visible={visible}
				target={target}
				placement={placement}
				offset={offset}
			>
				<div
					ref={contentRef}
					{...getContentProps()}
				>
					{content}
				</div>
			</Popover>
		</>
	)
}

export default Tooltip
