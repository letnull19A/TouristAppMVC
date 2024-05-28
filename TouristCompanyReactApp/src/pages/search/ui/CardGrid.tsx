import { SearchContext } from '@contexts'
import { TFavourite } from '@entities'
import { HotelCard } from '@widgets'
import { useContext } from 'react'

type TFavPage = {
	favorites?: Array<TFavourite>
}

export const CardGrid = (props: TFavPage) => {
	const context = useContext(SearchContext)
	const { favorites } = props

	const excludeOnlyFav = () => {
		const data = []

		if (favorites === undefined) return []

		for (let i = 0; i < favorites.length; i++) {
			for (let j = 0; j < context.data.length; j++) {
				if (favorites[i].tourId === context.data[j].id) {
					data.push(context.data[j])
				}
			}
		}

		return data
	}

	const cards = (favorites === undefined ? context.data : excludeOnlyFav()).map(
		(tour) => <HotelCard key={tour.id} tourData={tour} />
	)

	return (
		<div className="col-12 p-0 flex flex-wrap">
			{context.data !== undefined && context.data.length > 0 ? (
				cards
			) : (
				<>Туры отсутствуют</>
			)}
		</div>
	)
}
