import { attractionApi, cityApi, countryApi } from '@api'
import { TCity, TCountry, TAttraction, TEditAttractionForm } from '@entities'
import { CountryDropdown, CityDropdown } from '@ui'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const AttractionEdit = () => {
	const { edit, getById } = attractionApi
	const [attractionData, setHotelData] = useState<TAttraction>()
	const [country, setCountry] = useState<TCountry>()
	const [city, setCity] = useState<TCity>()
	const { id } = useParams()

	useEffect(() => {
		if (id !== undefined)
			getById(id).then((res: TAttraction) => setHotelData(res))
	}, [getById, id])

	useEffect(() => {
		if (attractionData !== undefined && attractionData.id !== undefined) {
			countryApi
				.getById(attractionData.country.id)
				.then((res: TCountry) => setCountry(res))
			cityApi.getById(attractionData.city.id).then((res: TCity) => setCity(res))
		}
	}, [attractionData])

	const defaultValues: Partial<TEditAttractionForm & { countryId: string }> = {
		id,
		cityId: attractionData?.city.id,
		name: attractionData?.name,
		description: attractionData?.description
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: Partial<TEditAttractionForm>) => {
		edit({
			id: data.id ?? '',
            name: data.name ?? '',
            description: data.description ?? '',
            cityId: data.cityId ?? '',
		})
	}

	return (
		attractionData !== undefined && (
			<div className="px-4">
				<AdminPageTitle title="Редактировать достопримечательность" displayExitButton />
				<div className="card flex mt-4 col-5">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-column gap-40"
						style={{ width: '100%' }}
					>
						<Controller
							name="name"
							control={control}
							defaultValue={attractionData.name}
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
							render={() => (
								<CountryDropdown defaultValue={country} className="mt-4" />
							)}
						/>
						<Controller
							name="cityId"
							control={control}
							defaultValue={attractionData.city.name}
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
							name="description"
							control={control}
							defaultValue={attractionData.description}
							rules={{ required: 'Описнаие не введено' }}
							render={({ field, fieldState }) => (
								<span className="p-float-label my-5">
									<InputTextarea
										id={field.name}
										{...field}
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
