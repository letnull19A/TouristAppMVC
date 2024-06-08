import { attractionApi, cityApi, countryApi } from '@api'
import { TCity, TCountry, TAttraction, TEditAttractionForm } from '@entities'
import { CountryDropdown, CityDropdown } from '@ui'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const AttractionEdit = () => {
	const { edit, getById } = attractionApi
	const [attractionData, setHotelData] = useState<TAttraction>()
	const [country, setCountry] = useState<TCountry>()
	const [city, setCity] = useState<TCity>()
	const [fileName, setFileName] = useState<string>()
	const { id } = useParams()

	const toast = useRef<Toast>(null)

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

		setFileName(attractionData?.imageUrl)
	}, [attractionData])

	const defaultValues: Partial<TEditAttractionForm> = {
		id,
		cityId: attractionData?.city.id,
		name: attractionData?.name,
		description: attractionData?.description,
		imageUrl: attractionData?.imageUrl
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: Partial<TEditAttractionForm>) => {
		edit({
			id: data.id ?? '',
			name: data.name ?? '',
			description: data.description ?? '',
			cityId: data.cityId ?? '',
			imageUrl: fileName ?? ''
		})
	}

	const onUpload = (event: FileUploadUploadEvent) => {
		if (event.xhr.status === 200) {
			const response = JSON.parse(event.xhr.responseText)

			setFileName(response.files[0].fileName)

			toast.current?.show({
				severity: 'success',
				summary: 'Успех!',
				detail: 'Файл успешно загружен!'
			})
		}
	}

	return (
		attractionData !== undefined && (
			<div className="px-4">
				<Toast ref={toast}></Toast>
				<AdminPageTitle
					title="Редактировать достопримечательность"
					displayExitButton
				/>
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
								<CountryDropdown
									defaultValue={country}
									className="mt-4"
								/>
							)}
						/>
						<Controller
							name="cityId"
							control={control}
							defaultValue={attractionData.city.id}
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
						<img
							src={`${import.meta.env.VITE_API_URI}/bucket/${fileName}`}
							className="mb-3"
						/>
						<FileUpload
							mode="basic"
							name="files"
							url={`${import.meta.env.VITE_API_URI}/api/files/upload`}
							accept="image/*"
							chooseLabel="Выберите файл для обложки (png, jpg, jpeg)"
							maxFileSize={1000000}
							onUpload={onUpload}
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
	)
}
