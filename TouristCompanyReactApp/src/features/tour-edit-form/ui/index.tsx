import {
	categoryApi,
	cityApi,
	countryApi,
	hotelApi,
	hotelTourApi,
	tourApi,
	tourPriceApi
} from '@api'
import { AddPriceTourContext } from '@contexts'
import {
	TAddPriceTour,
	TCategory,
	TCity,
	TCountry,
	TEditTourForm,
	THotel,
	TTour
} from '@entities'
import { TourAddPricesForm } from '@features'
import {
	CategoryDropdown,
	CityDropdown,
	CountryDropdown,
	HotelDropdown
} from '@ui'
import { Button } from 'primereact/button'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const TourEditForm = () => {
	const { getById } = tourApi
	const [tourData, setTourData] = useState<TTour>()
	const [category, setCategory] = useState<TCategory>()
	const [country, setCountry] = useState<TCountry>()
	const [city, setCity] = useState<TCity>()
	const [hotel, setHotel] = useState<THotel>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()
	const [fields, setFields] = useState<Array<TAddPriceTour>>()
	const [editedList, setEditedList] = useState<Set<string>>(new Set<string>())
	const [addedList, setAddedList] = useState<Set<string>>(new Set<string>())
	const [deleteList, setDeleteList] = useState<Set<string>>(new Set<string>())
	const [fileName, setFileName] = useState<string>()

	const { id } = useParams()

	useEffect(() => {
		if (id !== undefined) getById(id).then((res: TTour) => setTourData(res))
	}, [getById, id])

	useEffect(() => {
		setFileName(tourData?.imageUrl)
	}, [tourData?.imageUrl])

	const toast = useRef<Toast>(null)

	useEffect(() => {
		if (tourData !== undefined && tourData.id !== undefined) {
			categoryApi
				.getById(tourData.category.id)
				.then((res: TCategory) => setCategory(res))

			countryApi
				.getById(tourData.country.id)
				.then((res: TCountry) => setCountry(res))

			cityApi.getById(tourData.city.id).then((res: TCity) => setCity(res))

			hotelTourApi.getAll(tourData.id).then((res) => {
				if (res[0]?.hotelId !== undefined) {
					hotelApi.getById(res[0].hotelId).then((resq: THotel) => {
						resq.city = { id: resq.city.id, name: resq.city.name }
						resq.country = { id: resq.country.id, name: resq.country.name }
						setHotel(resq)
						setCurrentHotel(resq)
					})
				}
			})

			tourPriceApi.getAll(tourData.id).then(setFields)
		}
	}, [id, tourData])

	const defaultValues: Partial<TEditTourForm & { hotel: THotel }> = {
		id,
		name: tourData?.name,
		description: tourData?.description,
		countryId: tourData?.country.id,
		cityId: tourData?.city.id,
		categoryId: tourData?.category.id,
		hotel: currentHotel
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: Partial<TEditTourForm & { hotel: THotel }>) => {
		if (
			data === undefined ||
			data.id === undefined ||
			currentHotel === undefined
		)
			return

		if (hotel === undefined) {
			hotelTourApi.create({
				tourId: data.id,
				hotelId: currentHotel?.id
			})
		} else {
			hotelTourApi.edit({
				hotelId: data.id,
				tourId: hotel.id,
				newHotelId: currentHotel.id
			})
		}

		if (addedList.size > 0) {
			addedList.forEach((id) => {
				tourPriceApi.create({
					id: data.id ?? '',
					tourId: data.id ?? '',
					price: fields?.find((field) => field.id === id)?.price ?? 0,
					days: fields?.find((field) => field.id === id)?.days ?? 0
				})
			})
		}

		if (editedList.size > 0) {
			editedList.forEach((id) => {
				tourPriceApi.edit({
					tourId: data.id ?? '',
					price: fields?.find((field) => field.id === id)?.price ?? 0,
					days: fields?.find((field) => field.id === id)?.days ?? 0,
					id: id
				})
			})
		}

		if (deleteList.size > 0) {
			deleteList.forEach((id) => {
				tourPriceApi.delete(data.id ?? '', id)
			})
		}

		tourApi
			.edit({
				id: data.id,
				name: data.name ?? '',
				description: data.description ?? '',
				countryId: data.countryId ?? '',
				cityId: data.cityId ?? '',
				categoryId: data.categoryId ?? '',
				imageUrl: fileName ?? ''
			})
			.then((result) => {
				if (result.ok) {
					toast.current?.show({
						severity: 'success',
						summary: 'Успех!',
						detail: 'Тур успешно отредактирован'
					})
				}
			})
	}

	const handleDeletePrice = (id: string) => {
		if (addedList.has(id)) {
			const addList = addedList
			addList.delete(id)
			setAddedList(addList)
		} else {
			const origin = deleteList
			origin.add(id)
			setDeleteList(origin)
		}

		if (editedList.has(id)) {
			const origin = editedList
			origin.delete(id)
			setEditedList(origin)
		}
	}

	const handleEditPrice = (data: TAddPriceTour) => {
		if (addedList.has(data.id)) return

		const origin = editedList
		origin.add(data.id)
		setEditedList(origin)
	}

	const handleAppendPrice = (data: TAddPriceTour) => {
		const origin = addedList
		origin.add(data.id)
		setAddedList(origin)
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
		tourData !== undefined && (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-column gap-40 w-12"
			>
				<Toast ref={toast}></Toast>
				<Controller
					name="name"
					control={control}
					defaultValue={tourData.name}
					rules={{ required: 'Название не введено' }}
					render={({ field, fieldState }) => (
						<>
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
						</>
					)}
				/>
				<Controller
					name="categoryId"
					control={control}
					defaultValue={tourData.category.id}
					render={({ field }) => (
						<div className="mt-4">
							<CategoryDropdown
								defaultValue={category}
								onChange={(e) =>
									field.onChange((e.target.value as TCategory).id)
								}
							/>
						</div>
					)}
				/>
				<Controller
					name="countryId"
					control={control}
					defaultValue={tourData.country.id}
					render={({ field }) => (
						<div className="mt-4">
							<CountryDropdown
								defaultValue={country}
								onChange={(e) =>
									field.onChange((e.target.value as TCountry).id)
								}
							/>
						</div>
					)}
				/>
				<Controller
					name="cityId"
					control={control}
					defaultValue={tourData.city.id}
					render={({ field }) => (
						<div className="mt-4">
							<CityDropdown
								defaultValue={city}
								onChange={(e) => field.onChange((e.target.value as TCity).id)}
							/>
						</div>
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue={tourData.description}
					rules={{ required: 'Описнаие не введено' }}
					render={({ field, fieldState }) => (
						<span className="p-float-label mt-5 mb-4">
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
				<Controller
					name="hotel"
					control={control}
					defaultValue={currentHotel}
					render={({ field }) => (
						<div className="mb-4">
							<HotelDropdown
								defaultValue={hotel}
								onChange={(e) => {
									field.onChange(e.target.value as THotel)
									setCurrentHotel(e.target.value as THotel)
								}}
							/>
						</div>
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
				<AddPriceTourContext.Provider
					value={{ fields: fields ?? [], setFields: setFields }}
				>
					<TourAddPricesForm
						onDelete={handleDeletePrice}
						onEdit={handleEditPrice}
						onAppend={handleAppendPrice}
					/>
				</AddPriceTourContext.Provider>
				<Button
					className="mt-4"
					label="Подтвердить"
					type="submit"
					icon="pi pi-check"
				/>
			</form>
		)
	)
}
