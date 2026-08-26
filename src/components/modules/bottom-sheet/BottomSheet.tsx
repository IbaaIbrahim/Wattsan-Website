'use client'

import clsx from 'clsx'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import {
	FC,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import styles from './BottomSheet.module.scss'

const BottomSheet: FC<{
	opened?: boolean
	className: string
	title: ReactNode
	children: ReactNode
	onHide?: () => void
}> = ({ opened, className, title, children, onHide }) => {
	const headerRef = useRef(null)
	const contentRef = useRef(null)

	const mvOffset = useMotionValue(0)
	const mvHeaderHeight = useMotionValue(0)

	const [headerHeight, setHeaderHeight] = useState(0)

	// Measured before paint, otherwise the sheet lands at the wrong height on its first frame
	useLayoutEffect(() => {
		const header = headerRef.current

		if (header === null) return

		const measure = () => {
			const height = header.getBoundingClientRect().height

			setHeaderHeight(height)
			mvHeaderHeight.set(height)
		}

		measure()

		const observer = new ResizeObserver(measure)

		observer.observe(header)

		return () => observer.disconnect()
	}, [mvHeaderHeight])

	const [viewportHeight, setViewportHeight] = useState(() =>
		typeof window === 'undefined' ? 0 : window.innerHeight
	)

	// Mobile browsers resize the viewport when the url bar shows or hides
	useEffect(() => {
		const update = () => setViewportHeight(window.innerHeight)

		window.addEventListener('resize', update)

		return () => window.removeEventListener('resize', update)
	}, [])

	const [contentHeight, setContentHeight] = useState(0)

	useEffect(() => {
		if (contentRef.current !== null) {
			const observer = new ResizeObserver(entries =>
				setContentHeight(entries?.[0]?.contentRect?.height ?? 0)
			)

			observer.observe(contentRef.current?.children?.[0])
		}
	}, [contentRef.current])

	const [transition, setTransition] = useState(false)

	const bottomOffset = 100
	const headerOffset = 48

	const mvHeight = useTransform(
		[mvOffset, mvHeaderHeight],
		([offset, header]: number[]) => Math.max(0, header - offset)
	)

	const topLimit = useMemo(() => {
		const maximumTopLimit = -(
			viewportHeight -
			bottomOffset -
			headerOffset -
			headerHeight
		)

		const page =
			viewportHeight - bottomOffset - headerOffset - headerHeight
		const topLimitByContent = -(page - (page - contentHeight - 20))

		if (topLimitByContent > 0 || topLimitByContent < maximumTopLimit)
			return maximumTopLimit

		return topLimitByContent
	}, [bottomOffset, headerOffset, headerHeight, contentHeight, viewportHeight])

	useEffect(() => {
		if (opened) {
			move(topLimit)
		}
	}, [topLimit])

	const move = distance => {
		setTransition(true)

		mvOffset.set(distance)

		if (distance === 0) onHide?.()

		setTimeout(() => setTransition(false), 500)
	}

	const handleDragEnd = (_, info) => {
		move(info.velocity.y < 0 ? topLimit : 0)
	}

	useEffect(() => {
		if (opened) {
			move(topLimit)
		}
	}, [opened])

	return (
		<motion.div
			className={clsx(
				styles.bottomSheet,
				transition && styles.transition,
				className && className
			)}
			style={
				{
					height: mvHeight
				} as any
			}
		>
			<motion.div
				className={clsx(styles.dragHandle, transition && styles.transition)}
				style={{ y: mvOffset }}
				drag='y'
				dragElastic={0.025}
				// Dragging down collapses to the header, it must not slide below the actions panel
				dragConstraints={{ top: topLimit, bottom: 0 }}
				dragMomentum={false}
				onDragEnd={handleDragEnd}
			/>
			<div
				ref={headerRef}
				className={styles.header}
			>
				<div className={styles.title}>{title}</div>
			</div>
			<div
				ref={contentRef}
				className={styles.content}
			>
				{children}
			</div>
		</motion.div>
	)
}

export default BottomSheet
