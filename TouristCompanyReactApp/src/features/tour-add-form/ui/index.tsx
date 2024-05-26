import { tourApi, tourPriceApi } from '@api'
import { AddPriceTourContext } from '@contexts'
import {
	TAddPriceTour,
	TAddTourForm,
	TCategory,
	TCity,
	TCountry
} from '@entities'
import { TourAddPricesForm } from '@features'
import { CategoryDropdown, CityDropdown, CountryDropdown } from '@ui'
import { Button } from 'primereact/button'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export const TourAddForm = () => {
	const { create } = tourApi
	const [imageUploaded, setImageUploaded] = useState<boolean>(false)
	const [fileName, setFileName] = useState<string>()

	const defaultValues: TAddTourForm = {
		name: '',
		description: '',
		countryId: '',
		cityId: '',
		categoryId: '',
		imageUrl: ''
	}

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({ defaultValues })

	const [fields, setFields] = useState<Array<TAddPriceTour>>()

	const onSubmit = (data: TAddTourForm) => {
		create({
			name: data.name,
			categoryId: data.categoryId,
			description: data.description,
			countryId: data.countryId,
			cityId: data.cityId,
			imageUrl: fileName ?? ''
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(fields)
				fields &&
					fields.length > 0 &&
					fields.forEach((field) => {
						tourPriceApi.create({
							id: response.id,
							tourId: response.id,
							price: field.price,
							days: field.days
						})
					})
			})
	}

	const getFormErrorMessage = (name: keyof TAddTourForm) =>
		errors[name] ? (
			<small className="p-error">{errors[name]?.message}</small>
		) : null

	const toast = useRef<Toast>(null)

	const onUpload = (event: FileUploadUploadEvent) => {
		if (event.xhr.status === 200) {
			setImageUploaded(true)

			const response = JSON.parse(event.xhr.responseText)

			setFileName(response.files[0].fileName)

			toast.current?.show({
				severity: 'success',
				summary: 'Фото успешно загружено',
				detail: 'Продолжайте добавлять информацию'
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-column gap-40 w-12"
		>
			<Toast ref={toast}></Toast>
			<Controller
				name="name"
				control={control}
				rules={{ required: 'Название не введено' }}
				render={({ field, fieldState }) => (
					<>
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
						{getFormErrorMessage(field.name)}
					</>
				)}
			/>
			<Controller
				name="categoryId"
				control={control}
				rules={{ required: 'Не выбрана категория', minLength: 1 }}
				render={({ field }) => (
					<>
						<label htmlFor={field.name}></label>
						<div className="mt-4">
							<CategoryDropdown
								onChange={(e) =>
									field.onChange((e.target.value as TCategory).id)
								}
							/>
						</div>
						{getFormErrorMessage(field.name)}
					</>
				)}
			/>
			<Controller
				name="countryId"
				control={control}
				rules={{ required: 'Не выбрана страна', minLength: 1 }}
				render={({ field }) => (
					<>
						<label htmlFor={field.name}></label>
						<div className="mt-4">
							<CountryDropdown
								onChange={(e) =>
									field.onChange((e.target.value as TCountry).id)
								}
							/>
						</div>
						{getFormErrorMessage(field.name)}
					</>
				)}
			/>
			<Controller
				name="cityId"
				control={control}
				rules={{ required: 'Не выбран город', minLength: 1 }}
				render={({ field }) => (
					<>
						<label htmlFor={field.name}></label>
						<div className="mt-4">
							<CityDropdown
								onChange={(e) => field.onChange((e.target.value as TCity).id)}
							/>
						</div>
						{getFormErrorMessage(field.name)}
					</>
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
							rows={4}
							cols={30}
							className={classNames({ 'p-invalid': fieldState.error })}
							style={{ width: '100%' }}
						/>
						<label htmlFor={field.name}>Описание</label>
						{getFormErrorMessage(field.name)}
					</span>
				)}
			/>
			{!imageUploaded && <p>Обязательно загрузите фото обложки</p>}
			<FileUpload
				mode="basic"
				name="files"
				url={`${import.meta.env.VITE_API_URI}/api/files/upload`}
				accept="image/*"
				chooseLabel="Выберите файл для обложки (png, jpg, jpeg)"
				maxFileSize={1000000}
				onUpload={onUpload}
			/>
			<AddPriceTourContext.Provider
				value={{ fields: fields ?? [], setFields: setFields }}
			>
				<TourAddPricesForm />
			</AddPriceTourContext.Provider>
			<Button
				disabled={!imageUploaded}
				label="Подтвердить"
				type="submit"
				icon="pi pi-check"
				className="mt-4"
			/>
		</form>
	)
}
