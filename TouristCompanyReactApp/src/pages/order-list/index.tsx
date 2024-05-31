import { orderApi, tourApi } from '@api'
import { AuthContext, SearchContext } from '@contexts'
import { TAirport, TCountry, TOrder, TTour } from '@entities'
import { ProfileSidebar } from '@widgets'
import { useContext, useEffect, useState } from 'react'
import { CardOrderGrid } from './CardGrid'

export const OrderList = () => {
	const context = useContext(AuthContext)

	const [tours, setTours] = useState<Array<TTour>>([])
	const [airportId, setAirportId] = useState<TAirport>()
	const [country, setCountry] = useState<TCountry>()
	const [favs, setFavs] = useState<Array<TOrder>>([])

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})

		if (context.data === undefined) return

		console.log(context.data?.id);

		orderApi.getUserOrders(context.data?.id).then((res) => {
			console.log(res)
			setFavs(res)
		})
	}, [])

	return (
		<div className="flex flex-row">
			<ProfileSidebar />
			<div className="ml-5" style={{ width: '100%' }}>
				<SearchContext.Provider
					value={{
						data: tours,
						setData: setTours,
						airport: airportId,
						setAirportId: setAirportId,
						country: country,
						setCountry: setCountry
					}}
				>
					<h1 className="p-0 m-0">Заявки</h1>
					<CardOrderGrid orders={favs} />
				</SearchContext.Provider>
			</div>
		</div>
	)
}
