import { TOrder } from '@entities'
import { OrderCard } from '@widgets'
import './style.css'
import { v4 } from 'uuid'

type TFavPage = {
	orders?: Array<TOrder>
}

export const CardOrderGrid = (props: TFavPage) => {
	const { orders } = props

	const cards =
		orders !== undefined &&
		orders.map((order) => <OrderCard key={v4()} orderData={order} />)

	return (
		<div className="card-grid">
			{orders !== undefined && orders.length > 0 ? (
				cards
			) : (
				<>Заявки отсутствуют</>
			)}
		</div>
	)
}
