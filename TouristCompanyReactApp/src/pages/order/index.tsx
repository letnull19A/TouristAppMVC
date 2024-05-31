import { hotelApi, hotelTourApi, orderApi, tourApi, tourPriceApi } from '@api'
import { AuthContext } from '@contexts'
import { THotel, THotelTour, TTour, TTourPrice } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { Nullable } from 'primereact/ts-helpers'
import { classNames } from 'primereact/utils'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

type TOrder = {
	date: Date
	options: TTourPrice
}

export const OrderPage = () => {
	const [, setCurrentTour] = useState<TTour>()
	const [, setCurrentHotel] = useState<THotel>()
	const [, setCurrentHotelTour] = useState<THotelTour>()
	const [prices, setPrices] = useState<Array<TTourPrice>>([])
	const [date, setDate] = useState<Nullable<Date>>(null)
	const [days, setDays] = useState<number>(1)

	const { id } = useParams()

	const context = useContext(AuthContext)

	const toast = useRef<Toast>(null)

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

	const defaultValues: Partial<TOrder> = {
		date: new Date()
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: Partial<TOrder>) => {
		if (context.data?.id === undefined || data.options?.id === undefined) {
			return
		}

		orderApi
			.makeOrder({
				userId: context.data?.id ?? '',
				date: new Date().toISOString(),
				tourPriceId: data.options?.id ?? ''
			})
			.then((res) => {
				console.log(res)

				toast.current?.show({
					severity: 'success',
					summary: 'Успех!',
					detail:
						'Заявка успешно оформлена, перейдите в заявки чтобы увидеть её статус'
				})
			})
	}

	return (
		<>
			<AdminPageTitle title="Оформление заявки" toMain />
			<Toast ref={toast}></Toast>
			<div className="flex justify-content-center">
				<div className="col-12 sm:col-8 md:col-6 lg:col-5 lg:max-w-28rem mt-5">
					<form className="flex flex-column" onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="date"
							defaultValue={defaultValues.date}
							rules={{ required: 'Заполните поле с датой' }}
							render={({ field, fieldState }) => (
								<div style={{ width: '100%' }} className="mt-5">
									<label htmlFor={field.name}></label>
									<span className="p-float-label">
										<Calendar
											style={{ width: '100%' }}
											value={date}
											className={classNames({ 'p-invalid': fieldState.error })}
											onChange={(e) => {
												field.onChange(e.value)
												setDate(e.value)
											}}
										/>
										<label htmlFor={field.name}>Дата вылета</label>
									</span>
								</div>
							)}
						/>
						<Controller
							control={control}
							name="options"
							defaultValue={defaultValues.options}
							rules={{ required: 'Заполните поле с количеством дней' }}
							render={({ field, fieldState }) => (
								<div style={{ width: '100%' }} className="mt-5">
									<label htmlFor={field.name}></label>
									<span className="p-float-label">
										<Dropdown
											style={{ width: '100%' }}
											options={prices}
											optionLabel="days"
											className={classNames({ 'p-invalid': fieldState.error })}
											value={days}
											onChange={(e) => {
												setDays(e.target.value)
												field.onChange(e.value)
											}}
										/>
										<label htmlFor={field.name}>Количество дней</label>
									</span>
								</div>
							)}
						/>
						<Button className="mt-4" label={`Оформить заявку`} />
					</form>
				</div>
			</div>
		</>
	)
}
