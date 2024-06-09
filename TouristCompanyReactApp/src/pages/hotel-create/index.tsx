import { hotelApi } from '@api'
import { TAddHotelForm, TCity, TCountry } from '@entities'
import { useTitle } from '@hooks'
import { CityDropdown, CountryDropdown } from '@ui'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export const HotelCreate = () => {
	const toast = useRef<Toast>(null)
	const [rating, setRating] = useState<number>(0)
	const [country, setCountry] = useState<TCountry>()

	useTitle('Добавить отель')

	const defaultValues: TAddHotelForm & { countryId: string } = {
		countryId: '',
		cityId: '',
		name: '',
		description: '',
		rating: 0
	}

	const { control, handleSubmit, reset } = useForm({ defaultValues })

	const showSuccess = () => {
		toast.current?.show({
			severity: 'success',
			summary: 'Успех!',
			detail: 'Отель успешно добавлен!',
			life: 3000
		})
	}

	const onSubmit = async (data: TAddHotelForm) => {
		hotelApi.create({ ...data, rating }).then(() => {
			showSuccess()
		})

		reset()
	}

	return (
		<div className="px-4">
			<Toast ref={toast} />
			<AdminPageTitle title="Добавить новый отель" displayExitButton />
			<div className="card flex mt-4 col-5">
				<Toast ref={toast} />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-column gap-40"
					style={{ width: '100%' }}
				>
					<Controller
						name="name"
						control={control}
						rules={{ required: 'Название не введено' }}
						render={({ field, fieldState }) => (
							<div style={{ width: '100%' }}>
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
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
						render={({ field }) => (
							<CountryDropdown
								onChange={(e) => {
									setCountry(e.target.value as TCountry)
									field.onChange((e.target.value as TCountry).id)
								}}
								className="mt-4"
							/>
						)}
					/>
					<Controller
						name="cityId"
						control={control}
						render={({ field }) => (
							<div className="mt-4">
								<CityDropdown
									country={country}
									onChange={(e) => field.onChange((e.target.value as TCity).id)}
								/>
							</div>
						)}
					/>
					<Controller
						name="rating"
						control={control}
						render={() => (
							<div className="mt-4 mb-4">
								<Rating
									value={rating}
									onChange={(e) => setRating(e.value ?? 0)}
									cancel={false}
								/>
							</div>
						)}
					/>
					<Controller
						name="description"
						control={control}
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
}
