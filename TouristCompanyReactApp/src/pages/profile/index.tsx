import { favouritesApi, tourApi } from '@api'
import { AuthContext, SearchContext } from '@contexts'
import { TAirport, TCountry, TFavourite, TTour } from '@entities'
import { ProfileSidebar } from '@widgets'
import { useContext, useEffect, useState } from 'react'
import { CardGrid } from '../search/ui/CardGrid'

export const Profile = () => {
	const context = useContext(AuthContext)

	const [tours, setTours] = useState<Array<TTour>>([])
	const [airportId, setAirportId] = useState<TAirport>()
	const [country, setCountry] = useState<TCountry>()
	const [favs, setFavs] = useState<Array<TFavourite>>([])

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})

		if (context.data === undefined) return

		favouritesApi.getAll(context.data?.id).then(setFavs)
	}, [])

	return (
		<div className="flex flex-row">
			<ProfileSidebar />
			<div className="ml-0 md:ml-5" style={{ width: '100%' }}>
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
					<h1 className="p-0 m-0">Избранное</h1>
					<CardGrid favorites={favs} />
				</SearchContext.Provider>
			</div>
		</div>
	)
}
