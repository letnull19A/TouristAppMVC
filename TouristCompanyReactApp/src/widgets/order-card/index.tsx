import { hotelApi, hotelTourApi } from '@api'
import { TOrder } from '@entities'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import './style.css'

type HotelCardProps = {
	orderData: TOrder
}

export const OrderCard = (props: HotelCardProps) => {
	const { orderData } = props
	const { name, description, country, city, imageUrl, status } = orderData
	const [stars, setStars] = useState<number>(0)

	const title = <div style={{ height: 70, width: '100%', textWrap: 'wrap', overflow: 'hidden' }}>{name}</div>

	const renderStatus = (status: string) => {
		switch (status) {
			case 'AWAIT':
				return 'На рассмотрении'
            case 'ACCEPT':
                return 'Принята'
            case 'REJECT':
                return 'Отклонена'
            case 'CANCEL':
                return 'Отменена'
            default:
                return 'Неизвестно'
        }
	}

	const header = <img style={{ height: '100%', width: 300 }} alt="Card" src={imageUrl !== '' ? `${import.meta.env.VITE_API_URI}/bucket/${imageUrl}` : '/no_image.jpg'} />
	const footer = (
		<>
			<span>{renderStatus(status)}</span>
		</>
	)

	useEffect(() => {
		const hotelTour = hotelTourApi.getAll(orderData.id)
		hotelTour.then((res) => {
			hotelApi.getById(res[0].hotelId).then((res1) => {
				setStars(res1.rating)
			})
		})
	}, [orderData.id])

	return (
		<div className='card-item' style={{ width: '100%', height: 314 }}>
			<Card title={title} subTitle={`${country.name}, ${city.name}`} style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }} footer={footer} header={header}>
				<Rating value={stars} readOnly cancel={false} />
				<p style={{ height: '60px', overflow: 'hidden' }} className="mt-2 mb-0">{description}</p>
			</Card>
		</div>
	)
}
