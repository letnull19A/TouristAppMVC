import { Controller, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { AdminPageTitle } from '../../../widgets'
import { CityDropdown, CountryDropdown } from '@ui'
import { TAddAttractionForm, TCity, TCountry } from '@entities'
import { attractionApi } from '@api'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'

export const AttractionCreate = () => {
	const [country, setCountry] = useState<TCountry>()

	const defaultValues: TAddAttractionForm & { countryId: string } = {
		cityId: '',
		countryId: '',
		name: '',
		description: ''
	}

	const { control, handleSubmit, reset } = useForm({ defaultValues })

	const toast = useRef<Toast>(null)

	const showSuccess = () => {
		toast.current?.show({
			severity: 'success',
			summary: 'Успех!',
			detail: 'Достопримечательность успешно добавлен!',
			life: 3000
		})
	}

	const onSubmit = (data: TAddAttractionForm) => {
		attractionApi.create({ ...data }).then(() => {
			showSuccess()
		})

		reset()
	}

	return (
		<div className="px-4">
			<Toast ref={toast} />
			<AdminPageTitle title='Добавить достопримечательность' displayExitButton />
			<div className="card flex mt-4 col-5">
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
						rules={{ required: 'Выберете страну' }}
						render={({ field }) => (
							<div className="mt-2">
								<CountryDropdown
									onChange={(e) => {
										setCountry(e.target.value as TCountry)
										field.onChange((e.target.value as TCountry).id)
									}}
									className="mt-4"
								/>
							</div>
						)}
					/>
					<Controller
						name="cityId"
						control={control}
						rules={{ required: 'Выберете город' }}
						render={({ field }) => (
							<div className="mt-5">
								<CityDropdown
									country={country}
									onChange={(e) => field.onChange((e.target.value as TCity).id)}
								/>
							</div>
						)}
					/>
					<Controller
						name="description"
						control={control}
						rules={{ required: 'Описнаие не введено' }}
						render={({ field, fieldState }) => (
							<span className="p-float-label mt-5">
								<InputTextarea
									id={field.name}
									{...field}
									rows={4}
									cols={30}
									onChange={(e) => field.onChange(e.target.value)}
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
								/>
								<label htmlFor={field.name}>Описание</label>
							</span>
						)}
					/>
					<Button
						className="mt-4"
						label="Подтвердить"
						type="submit"
						icon="pi pi-check"
					/>
				</form>
			</div>
		</div>
	)
}
