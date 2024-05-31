import { TOrder } from '@entities'
import { OrderCard } from '@widgets'
import './style.css'

type TFavPage = {
	orders?: Array<TOrder>
}

export const CardOrderGrid = (props: TFavPage) => {
	const { orders } = props

	const cards =
		orders !== undefined &&
		orders.map((order) => <OrderCard key={order.id} orderData={order} />)

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
