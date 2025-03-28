// import PopularItem from '@components/modules/basket/popular-item/PopularItem'
import BlankContent from '@components/modules/common/blank-content/BlankContent'
// import { TPopularItems } from '@my-types/basket'
import emptyBasket from '@public/img/basket/empty-basket.svg'
import { FC } from 'react'

// import styles from './EmptyBasket.module.scss'

const EmptyBasket: FC = () => {
	return (
		<>
			<BlankContent
				image={emptyBasket}
				title={
					<>
						Basket is currently <br /> empty
					</>
				}
				description={
					<>
						Navigate to the Home page and use our catalog <br /> to select the
						items you need.
					</>
				}
				action='Go to the Home page'
			/>
			{/** Временно скрыто, так как нет такого функционала */}
			{/*<div className={styles.popularItems}>*/}
			{/*	<div className={styles.popularItemsTitle}>Popular items</div>*/}
			{/*	<div className={styles.items}>*/}
			{/*		{popularItems.map(item => (*/}
			{/*			<PopularItem*/}
			{/*				key={item.id}*/}
			{/*				item={item}*/}
			{/*			/>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*</div>*/}
		</>
	)
}

export default EmptyBasket
