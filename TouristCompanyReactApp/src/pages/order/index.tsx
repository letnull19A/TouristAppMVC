import { hotelApi, hotelTourApi, tourApi, tourPriceApi } from '@api'
import { THotel, THotelTour, TTour, TTourPrice } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const OrderPage = () => {
	const [, setCurrentTour] = useState<TTour>()
	const [, setCurrentHotel] = useState<THotel>()
	const [, setCurrentHotelTour] = useState<THotelTour>()
	const [prices, setPrices] = useState<Array<TTourPrice>>([])

	const { id } = useParams()

	useEffect(() => {
		if (id === undefined) return
		tourPriceApi.getAll(id).then(setPrices)

		tourApi.getById(id).then((res) => {
			setCurrentTour(res)

			hotelTourApi.getAll(id).then((resq) => {
				setCurrentHotelTour(resq[0])

				hotelApi.getById(resq[0].hotelId).then(setCurrentHotel)
			})
		})
	}, [id])

	return (
		<>
			<AdminPageTitle title="Оформление заявки" toMain />
			<div className="flex justify-content-center">
				<div className="col-12 sm:col-8 md:col-6 lg:col-5 lg:max-w-28rem mt-5">
					<form className="flex flex-column">
						<p>Дата вылета</p>
						<Calendar />
						<p>Количество дней</p>
						<Dropdown
							options={prices.map((u) => u.days)}
							placeholder="Выберете количество дней"
						/>
						<Button className="mt-4" label="Оформить заявку" />
					</form>
				</div>
			</div>
		</>
	)
}