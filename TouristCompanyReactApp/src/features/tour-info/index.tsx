import { hotelApi, hotelTourApi, tourApi } from '@api'
import { THotel, THotelTour, TTour } from '@entities'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import './style.css'

type TTourInfoProps = {
	tourId: string
}

export const TourInfo = (props: TTourInfoProps) => {
	const { tourId } = props

	const [currentHotelTour, setCurrentHotelTour] = useState<THotelTour>()
	const [currentTour, setCurrentTour] = useState<TTour>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()

	useEffect(() => {
		hotelTourApi.getAll(tourId).then((res) => setCurrentHotelTour(res[0]))
		tourApi.getById(tourId).then(setCurrentTour)
	}, [tourId])

	useEffect(() => {
		if (currentHotelTour === undefined) return

		hotelApi.getById(currentHotelTour.hotelId).then(setCurrentHotel)
	}, [currentHotelTour])

	return (
		<Card title={currentTour?.name} className='tour-info'>
			<p className="flex flex-row gap-2">
				Оценка отеля:{' '}
				<Rating cancel={false} readOnly value={currentHotel?.rating} />
			</p>
			<p>Категория: {currentTour?.category.name}</p>
			<p>Страна: {currentTour?.country.name}</p>
			<p>Город: {currentTour?.city.name}</p>
		</Card>
	)
}
