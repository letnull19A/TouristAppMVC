import { cityApi, countryApi, hotelApi } from '@api'
import { TCity, TCountry, TEditHotelForm, THotel } from '@entities'
import { useTitle } from '@hooks'
import { CountryDropdown, CityDropdown } from '@ui'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const HotelEdit = () => {
	const { edit, getById } = hotelApi
	const [hotelData, setHotelData] = useState<THotel>()
	const [country, setCountry] = useState<TCountry>()
	const [city, setCity] = useState<TCity>()
	const { id } = useParams()
	const toast = useRef<Toast>(null)

	useTitle('Редактирование отелей')

	useEffect(() => {
		if (id !== undefined) getById(id).then((res: THotel) => setHotelData(res))
	}, [getById, id])

	useEffect(() => {
		if (hotelData !== undefined && hotelData.id !== undefined) {
			countryApi
				.getById(hotelData.country.id)
				.then((res: TCountry) => setCountry(res))
			cityApi.getById(hotelData.city.id).then((res: TCity) => setCity(res))
		}
	}, [hotelData])

	const defaultValues: Partial<TEditHotelForm & { countryId: string }> = {
		id,
		countryId: hotelData?.country.id,
		cityId: hotelData?.city.id,
		name: hotelData?.name,
		description: hotelData?.description,
		rating: hotelData?.rating
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = async (data: Partial<TEditHotelForm>) => {
		console.log(data)

		const response = await edit({
			id: data.id ?? '',
			cityId: data.cityId ?? '',
			countryId: data.countryId ?? '',
			name: data.name ?? '',
			description: data.description ?? '',
			rating: data.rating ?? 0
		})

		if (response.ok) {
			toast.current?.show({
				severity: 'success',
				summary: 'Успех',
				detail: 'Изменения сохранены'
			})
		}

		if (!response.ok) {
			toast.current?.show({
				severity: 'error',
				summary: 'Ошибка',
				detail: response.statusText
			})
		}
	}

	return (
		hotelData !== undefined && (
			<div className="px-4">
				<Toast ref={toast} />
				<AdminPageTitle title="Редактировать отель" displayExitButton />
				<div className="card flex mt-4 col-5">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-column gap-40"
						style={{ width: '100%' }}
					>
						<Controller
							name="name"
							control={control}
							defaultValue={hotelData.name}
							rules={{ required: 'Название не введено' }}
							render={({ field, fieldState }) => (
								<div style={{ width: '100%' }}>
									<label htmlFor={field.name}></label>
									<span className="p-float-label">
										<InputText
											id={field.name}
											type="text"
											{...field}
											className={classNames({ 'p-invalid': fieldState.error })}
											style={{ width: '100%' }}
											onChange={(e) => field.onChange(e.target.value)}
										/>
										<label htmlFor={field.name}>Название</label>
									</span>
								</div>
							)}
						/>
						<Controller
							name="countryId"
							control={control}
							defaultValue={hotelData.country.id}
							render={({ field }) => (
								<CountryDropdown
									defaultValue={country}
									onChange={(e) =>
										field.onChange((e.target.value as TCountry).id)
									}
									className="mt-4"
								/>
							)}
						/>
						<Controller
							name="cityId"
							control={control}
							defaultValue={hotelData.city.id}
							render={({ field }) => (
								<div className="mt-4">
									<CityDropdown
										defaultValue={city}
										onChange={(e) =>
											field.onChange((e.target.value as TCity).id)
										}
									/>
								</div>
							)}
						/>
						<Controller
							name="rating"
							control={control}
							defaultValue={hotelData.rating}
							render={({ field }) => (
								<div className="mt-4 mb-2">
									<Rating
										defaultValue={hotelData.rating}
										{...field}
										onChange={(e) => {
											field.onChange(e.target.value)
										}}
										cancel={false}
									/>
								</div>
							)}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue={hotelData.description}
							rules={{ required: 'Описнаие не введено' }}
							render={({ field, fieldState }) => (
								<span className="p-float-label my-4">
									<InputTextarea
										id={field.name}
										{...field}
										defaultValue={field.value}
										rows={4}
										cols={30}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
									/>
									<label htmlFor={field.name}>Описание</label>
								</span>
							)}
						/>
						<Button label="Подтвердить" type="submit" icon="pi pi-check" />
					</form>
				</div>
			</div>
		)
	)
}
