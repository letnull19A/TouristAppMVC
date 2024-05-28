import { favouritesApi, hotelApi, hotelTourApi, tourApi } from '@api'
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
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	const { id } = useParams()
	const context = useContext(AuthContext)

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
			setIsFavorite(false);
		})
	}

	const favouriteButton = !isFavorite ? (
		<Button
			onClick={() => toFavourite()}
			outlined
			className="w-full"
			label="Добавить в избранное"
		/>
	) : (
		<Button
			onClick={() => deleteFromFavourite()}
			outlined
			className="w-full"
			label="Уже находится в избранном"
		/>
	)

	return (
		<>
			<AdminPageTitle title="Обозреватель тура" toMain />
			<div className="grid mt-5 flex flex-column md:flex-row">
				<div className="col-12 md:col-7">
					<img
						className="w-full"
						src={`${import.meta.env.VITE_API_URI}/bucket/${
							currentTour?.imageUrl
						}`}
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
					{context.isAuth() && favouriteButton}
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
