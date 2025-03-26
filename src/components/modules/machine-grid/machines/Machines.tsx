import GridContent from '../grid-content/GridContent'
import GridTitle from '../grid-title/GridTitle'
import WorkingArea from '../work-area/WorkingArea'

import styles from './Machines.module.scss'

const Machines = () => {
	return (
		<div className={styles.container}>
			<GridTitle />
			<div className={styles.filter}>
				<WorkingArea />
			</div>
			<div className={styles['container__grid']}>
				<GridContent />
			</div>
		</div>
	)
}

export default Machines
