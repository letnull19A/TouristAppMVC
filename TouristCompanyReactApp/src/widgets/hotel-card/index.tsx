import { hotelApi, hotelTourApi } from '@api'
import { TTour } from '@entities'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type HotelCardProps = {
	tourData: TTour
}

export const HotelCard = (props: HotelCardProps) => {
	const { tourData } = props
	const { name, description, country, city } = tourData
	const [stars, setStars] = useState<number>(0)

	const navigate = useNavigate()

	const title = <div style={{ height: 70, width: '100%', textWrap: 'wrap', overflow: 'hidden' }}>{name}</div>

	const header = <img style={{ height: 170 }} alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
	const footer = (
		<>
			<Button onClick={() => navigate(`tour/${tourData.id}/view`)} label="Подробнее" style={{ width: '100%' }} />
		</>
	)

	useEffect(() => {
		const hotelTour = hotelTourApi.getAll(tourData.id)
		hotelTour.then((res) => {
			hotelApi.getById(res[0].hotelId).then((res1) => {
				setStars(res1.rating)
			})
		})
	}, [tourData.id])

	return (
		<div className="xl:col-3 lg:col-4 md:col-4 sm:col-6">
			<Card title={title} subTitle={`${country.name}, ${city.name}`} footer={footer} header={header}>
				<Rating value={stars} readOnly cancel={false} />
				<p style={{ height: '40px' }} className="mt-2 mb-0">{description}</p>
			</Card>
		</div>
	)
}
