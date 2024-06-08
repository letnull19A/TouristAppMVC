import { tourPriceApi } from '@api'
import { Card } from 'primereact/card'
import { useEffect, useState } from 'react'
import { TTourPrice } from '@entities'
import './style.css'

type TTourPricesProps = {
	tourId: string
}

export const TourPrices = (props: TTourPricesProps) => {
	const { tourId } = props

	const [prices, setPrices] = useState<Array<TTourPrice>>([])

	useEffect(() => {
		tourPriceApi.getAll(tourId).then(setPrices)
	}, [tourId])

	return (
		<Card title="Расценки на туры" className='tour-prices'>
			<table cellSpacing={10}>
				<thead>
					<tr>
						<th>Дней</th>
						<th>Стоимость</th>
					</tr>
				</thead>
				<tbody>
					{prices.map((price) => (
						<tr>
							<td className='days'>{price.days}</td>
							<td className='price'>{price.price} Руб.</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	)
}
