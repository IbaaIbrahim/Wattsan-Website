import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { FC } from 'react'

import cn from './CompareSwitcher.module.scss'

export const CompareSwitcher: FC<{
	compare: boolean
	counter: number
	onToggle: (compare: boolean) => void
}> = ({ compare, counter, onToggle }) => {
	return (
		<div className={cn.switcher}>
			<button
				className={clsx(cn.button, !compare && cn.active)}
				onClick={() => onToggle(false)}
			>
				<Typography
					className={clsx(compare && cn.inactiveText)}
					tag='p'
					size='s'
					weight={compare ? 'regular' : 'semi-bold'}
					align='center'
				>
					Your configuration
				</Typography>
			</button>
			<button
				className={clsx(cn.button, compare && cn.active)}
				onClick={() => onToggle(true)}
			>
				<Typography
					className={clsx(!compare && cn.inactiveText, cn.text)}
					tag='p'
					size='s'
					weight={compare ? 'semi-bold' : 'regular'}
					align='center'
				>
					Comparison with basic&nbsp;
					<Typography
						className={cn.text}
						tag='p'
						size='s'
						weight='regular'
						discolored={true}
					>
						({counter} changes)
					</Typography>
				</Typography>
			</button>
		</div>
	)
}
