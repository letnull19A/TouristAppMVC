import {
	cityApi,
	countryApi,
	favouritesApi,
	hotelApi,
	hotelTourApi,
	tourApi
} from '@api'
import { AuthContext, SearchContext } from '@contexts'
import { TCity, TCountry, THotel, THotelTour, TTour } from '@entities'
import { AttractionBlocks, TourInfo, TourPrices } from '@features'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { TabPanel, TabView } from 'primereact/tabview'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardGrid } from './../../search/ui/CardGrid'
import './style.css'
import { useTitle } from '@hooks'

const getRandom = async (): Promise<Array<TTour>> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/random/4`,
		{
			method: 'GET'
		}
	)

	const data = await response.json()
	return data
}

export const TourView = () => {
	const [currentTour, setCurrentTour] = useState<TTour>()
	const [currentCity, setCurrentCity] = useState<TCity>()
	const [currentCountry, setCurrentCountry] = useState<TCountry>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()
	const [, setCurrentHotelTour] = useState<THotelTour>()
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const [tours, setTours] = useState<Array<TTour>>()
	const { id } = useParams()
	const context = useContext(AuthContext)

	useTitle('Обозреватель туров')

	useEffect(() => {
		if (id === undefined) return

		tourApi.getById(id).then((res) => {
			setCurrentTour(res)

			hotelTourApi.getAll(id).then((resq) => {
				setCurrentHotelTour(resq[0])

				hotelApi.getById(resq[0].hotelId).then(setCurrentHotel)
			})

			cityApi.getById(res.city.id).then((resq) => {
				setCurrentCity(resq)
			})

			countryApi.getById(res.country.id).then((resq) => {
				setCurrentCountry(resq)
			})
		})

		getRandom().then(setTours)
	}, [id])

	useEffect(() => {
		if (context.data?.id === undefined || id === undefined) return

		favouritesApi.getAll(context.data?.id).then((res) => {
			const isFav = res.map((i) => i.tourId).includes(id)

			setIsFavorite(isFav)
		})
	}, [context.data?.id, id])

	const navigate = useNavigate()

	const handleMakeOrder = () => {
		navigate(context.isAuth() ? `/tour/${id}/order` : '/auth')
	}

	const toFavourite = () => {
		if (context.data?.id === undefined || id === undefined) return

		favouritesApi.addFavourite(context.data?.id, id).then(() => {
			setIsFavorite(true)
		})
	}

	const deleteFromFavourite = () => {
		if (context.data?.id === undefined || id === undefined) return

		favouritesApi.delete(context.data?.id, id).then(() => {
			setIsFavorite(false)
		})
	}

	const favouriteButton = !isFavorite ? (
		<Button
			onClick={() => toFavourite()}
			outlined
			className="w-full custom-button"
			label="Добавить в избранное"
		/>
	) : (
		<Button
			onClick={() => deleteFromFavourite()}
			outlined
			className="w-full custom-button"
			label="Уже находится в избранном"
		/>
	)

	return (
		<>
			<AdminPageTitle title="" toMain />
			<div className="grid mt-5 flex flex-column md:flex-row">
				<div className="col-12 md:col-7">
					<img
						className="w-full tour-view__image"
						src={`${import.meta.env.VITE_API_URI}/bucket/${
							currentTour?.imageUrl
						}`}
						style={{ objectFit: 'contain' }}
					/>
				</div>
				<div className="col-12 md:col-5 flex flex-column gap-3">
					{id && <TourInfo tourId={id} />}
					{id && <TourPrices tourId={id} />}
					<div className="mt-0 flex flex-row gap-2">
						<Button
							onClick={() => handleMakeOrder()}
							className="w-full custom-button"
							label="Оставить заявку на тур"
						/>
						{context.isAuth() && favouriteButton}
					</div>
				</div>
			</div>
			<TabView className="mt-4">
				<TabPanel header="О туре">
					<p className="m-0">{currentTour?.description}</p>
				</TabPanel>
				<TabPanel header="О гостинице">
					<p className="m-0">{currentHotel?.description}</p>
				</TabPanel>
				<TabPanel header="О городе">
					<p className="m-0">{currentCity?.description}</p>
				</TabPanel>
				<TabPanel header="О стране">
					<p className="m-0">{currentCountry?.description}</p>
				</TabPanel>
			</TabView>
			<p className="text-2xl">Достопримечательности</p>
			{currentTour?.city.id && (
				<AttractionBlocks cityId={currentTour.city.id} />
			)}
			<p className="text-2xl">Смотрите ещё</p>
			{tours !== undefined && (
				<SearchContext.Provider value={{ data: tours, setData: setTours }}>
					<CardGrid />
				</SearchContext.Provider>
			)}
		</>
	)
}
