import { hotelApi, hotelTourApi, tourApi } from '@api'
import { AuthContext } from '@contexts'
import { THotel, THotelTour, TTour } from '@entities'
import { TourInfo, TourPrices } from '@features'
import { AdminPageTitle } from '@widgets'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const TourView = () => {
	const [currentTour, setCurrentTour] = useState<TTour>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()
	const [, setCurrentHotelTour] = useState<THotelTour>()

	const { id } = useParams()

	useEffect(() => {
		if (id === undefined) return

		tourApi.getById(id).then((res) => {
			setCurrentTour(res)

			hotelTourApi.getAll(id).then((resq) => {
				setCurrentHotelTour(resq[0])

				hotelApi.getById(resq[0].hotelId).then(setCurrentHotel)
			})
		})
	}, [id])

	const navigate = useNavigate()

	const context = useContext(AuthContext)

	const handleMakeOrder = () => {
		navigate(context.isAuth() ? `/tour/${id}/order` : '/auth')
	}

	return (
		<>
			<AdminPageTitle title="Обозреватель тура" toMain />
			<div className="grid mt-5 flex flex-column md:flex-row">
				<div className="col-12 md:col-7">
					<img
						className="w-full"
						src={`${import.meta.env.VITE_API_URI}/bucket/${currentTour?.imageUrl}`}
						style={{ objectFit: 'contain' }}
					/>
				</div>
				<div className="col-12 md:col-5 flex flex-column gap-3">
					{id && <TourInfo tourId={id} />}
					{id && <TourPrices tourId={id} />}
					<Button
						onClick={() => handleMakeOrder()}
						className="w-full"
						label="Оставить заявку"
					/>
					{context.isAuth() && (
						<Button outlined className="w-full" label="В избранное" />
					)}
				</div>
			</div>
			<p className="text-2xl">Дополнительная информация</p>
			<div className="grid">
				<Accordion activeIndex={0} className="col-12">
					<AccordionTab header="О туре">
						<p className="m-0">{currentTour?.description}</p>
					</AccordionTab>
					<AccordionTab header="О гостинице">
						<p className="m-0">{currentHotel?.description}</p>
					</AccordionTab>
				</Accordion>
			</div>
			<p className="text-2xl">Смотрите ещё</p>
		</>
	)
}
