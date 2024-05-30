import { hotelApi, hotelTourApi } from '@api'
import { TTour } from '@entities'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

type HotelCardProps = {
	tourData: TTour
}

export const HotelCard = (props: HotelCardProps) => {
	const { tourData } = props
	const { name, description, country, city, imageUrl } = tourData
	const [stars, setStars] = useState<number>(0)

	const navigate = useNavigate()

	const title = <div style={{ height: 70, width: '100%', textWrap: 'wrap', overflow: 'hidden' }}>{name}</div>

	const header = <img style={{ height: '100%', width: 300 }} alt="Card" src={imageUrl !== '' ? `${import.meta.env.VITE_API_URI}/bucket/${imageUrl}` : '/no_image.jpg'} />
	const footer = (
		<>
			<Button onClick={() => navigate(`/tour/${tourData.id}/view`)} label="Перейти к туру" style={{ width: '100%' }} />
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
		<div className='card-item' style={{ width: '100%', height: 314 }}>
			<Card title={title} subTitle={`${country.name}, ${city.name}`} style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }} footer={footer} header={header}>
				<Rating value={stars} readOnly cancel={false} />
				<p style={{ height: '60px', overflow: 'hidden' }} className="mt-2 mb-0">{description}</p>
			</Card>
		</div>
	)
}
