import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { TCountry } from '@entities'
import { AdminPageTitle } from '@widgets'
import { CountryDropdown } from '@ui'
import { cityApi } from '@api'
import { useTitle } from '@hooks'

type TForm = {
	name: string
	countryId: string
	description: string
}

export const CityCreate = () => {
	const { create } = cityApi

	useTitle('Добавить город')
	
	const defaultValues: TForm = {
		name: '',
		description: '',
		countryId: ''
	}

	const { control, handleSubmit, reset } = useForm({ defaultValues })

	const onSubmit = (data: TForm) => {
		create({ ...data })

		reset()
	}

	return (
		<div className="px-4">
			<AdminPageTitle title="Добавить новый город" displayExitButton />
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
						render={({ field }) => (
							<CountryDropdown
								className="mt-5"
								onChange={(e) =>
									field.onChange((e.target.value as TCountry).id)
								}
							/>
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
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
								/>
								<label htmlFor={field.name}>Описание</label>
							</span>
						)}
					/>
					<Button
						className="mt-5"
						label="Подтвердить"
						type="submit"
						icon="pi pi-check"
					/>
				</form>
			</div>
		</div>
	)
}
