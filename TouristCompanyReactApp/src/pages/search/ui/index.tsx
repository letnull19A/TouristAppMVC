import { tourApi } from '@api'
import { SearchContext } from '@contexts'
import { TAirport, TCountry, TTour } from '@entities'
import { useEffect, useState } from 'react'
import { CardGrid } from './CardGrid'
import { Filter } from './Filter'
import { Search } from './Search'

export const SearchPage = () => {
	const [tours, setTours] = useState<Array<TTour>>([])
	const [airportId, setAirportId] = useState<TAirport>()
	const [country, setCountry] = useState<TCountry>()

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})
	}, [])

	return (
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
			<div className="flex flex-row">
				<div className="md:col-4 lg:col-2 hidden md:block">
					<div className="filter__card px-3 pt-1 pb-3">
						<Filter />
					</div>
				</div>
				<div className="flex flex-column col-12 md:col-8 lg:col-10 adaptive-layout">
					<Search />
					<CardGrid />
				</div>
			</div>
		</SearchContext.Provider>
	)
}
