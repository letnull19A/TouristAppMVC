import { ticketApi, tourApi } from '@api'
import { SearchContext } from '@contexts'
import { TAirport, TCountry } from '@entities'
import { CountryDropdown } from '@ui'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import {
	InputNumber,
	InputNumberValueChangeEvent
} from 'primereact/inputnumber'
import { Nullable } from 'primereact/ts-helpers'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './style.css'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'

type TAirportsDropdownProps = {
	defaultValue?: TAirport
	onChange?: (e: DropdownChangeEvent) => void
	className?: string
}

type TFilter = {
	search: string | undefined
	country: TCountry | undefined
	airport: TAirport | undefined
	date: string
	humans: number
	days: number
}

const AirportsDropdown = (props: TAirportsDropdownProps) => {
	const { onChange, defaultValue, className } = props

	const [airports, setAirports] = useState<Array<TAirport>>([])
	const [selected, setSelected] = useState<TAirport | null>(null)

	useEffect(() => {
		ticketApi.airports.getAll().then(setAirports)
		setSelected(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			className={className}
			value={selected}
			onChange={(e) => {
				setSelected(e.target.value)
				onChange?.(e)
			}}
			options={airports}
			optionLabel="city"
			placeholder="Выберете аэропорт"
		/>
	)
}

export const Filter = () => {
	const [dates, setDates] = useState<Nullable<Date | null>>(null)
	const [humans, setHumans] = useState<number>(1)
	const [days, setDays] = useState<number>(1)
	const [isNotMobile, setIsNotMobile] = useState<boolean>(true)
	const [isFixed, setIsFixed] = useState<boolean>(false)
	const [isFiltred, setIsFiltred] = useState<boolean>(false)

	const context = useContext(SearchContext)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setIsFixed(window.scrollY > 50)
		})

		window.addEventListener('resize', () => {
			setIsNotMobile(window.innerWidth > 768)
		})

		setIsNotMobile(window.innerWidth > 768)
	}, [])

	useLayoutEffect(() => {
		setIsFixed(window.scrollY > 50)
	}, [])

	const defaultValues: TFilter = {
		search: '',
		country: undefined,
		airport: undefined,
		date: '',
		humans: 1,
		days: 1
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = async (data: TFilter) => {
		console.log(data)

		setIsFiltred((prev) => !prev)

		if (isFiltred) {
			tourApi.getAll().then(context.setData)
			return
		}

		const result = await fetch(
			`${import.meta.env.VITE_API_URI}/api/search/filter`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					search: context.search,
					countryName: data.country?.name,
					date: data.date,
					days: data.days
				})
			}
		)

		const json = await result.json()

		console.log(json)

		if (json) {
			console.log(json)

			context.setData(json)
		}
	}

	return (
		<div
			className={
				'filter__card md:px-3 md:pt-1 md:pb-3 ' +
				classNames({
					fixed: isFixed && isNotMobile,
					filter__card_fixed: isFixed && isNotMobile
				})
			}
		>
			<h2 className="mt-2">Опции</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-column gap-5 mt-3">
					<Controller
						control={control}
						name="airport"
						rules={{ required: 'Выберете аэропорт' }}
						render={({ field }) => (
							<div className="flex flex-column gap-2 p-0">
								<label>Город вылета</label>
								<AirportsDropdown
									className="input-override select-override"
									onChange={(e) => {
										field.onChange(e.target.value)
										context.setAirportId?.(e.target.value)
									}}
								/>
							</div>
						)}
					/>
					<Controller
						control={control}
						name="country"
						rules={{ required: 'Выберете страну' }}
						render={({ field }) => (
							<div className="flex flex-column gap-2">
								<label>Страна назначения</label>
								<CountryDropdown
									className="input-override select-override"
									onChange={(e) => {
										field.onChange(e.target.value)
										context.setCountry?.(e.target.value)
									}}
								/>
							</div>
						)}
					/>
					<Controller
						control={control}
						name="date"
						rules={{ required: 'Выберете дату' }}
						render={({ field }) => (
							<div className="flex flex-column gap-2">
								<label>Дата вылета</label>
								<Calendar
									value={dates}
									onChange={(e) => {
										field.onChange(e.target.value?.toISOString())
										setDates(e.value)
									}}
									selectionMode="single"
									className="calendar input-override"
									readOnlyInput
									hideOnRangeSelection
								/>
							</div>
						)}
					/>
					<Controller
						control={control}
						name="humans"
						rules={{ required: 'Введите кол-во человек' }}
						render={({ field }) => (
							<div className="flex flex-column gap-2 p-0">
								<label>Кол-во человек</label>
								<InputNumber
									value={humans}
									className="number-input"
									onValueChange={(e: InputNumberValueChangeEvent) => {
										field.onChange(e.target.value)
										setHumans(e.target.value ?? 0)
									}}
									showButtons
									buttonLayout="horizontal"
									step={1}
									min={1}
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									mode="decimal"
								/>
							</div>
						)}
					/>
					<Controller
						control={control}
						name="days"
						rules={{ required: 'Введите кол-во дней' }}
						render={({ field }) => (
							<div className="flex flex-column gap-2 p-0">
								<label>Кол-во дней</label>
								<InputNumber
									value={days}
									className="number-input"
									onValueChange={(e: InputNumberValueChangeEvent) => {
										field.onChange(e.target.value)
										setDays(e.target.value ?? 0)
									}}
									showButtons
									buttonLayout="horizontal"
									step={1}
									min={1}
									max={21}
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									mode="decimal"
								/>
							</div>
						)}
					/>
					<Button
						className="button-override"
						style={{ height: '45px' }}
						label="Фильтровать"
						icon="pi pi-filter"
					/>
				</div>{' '}
			</form>
		</div>
	)
}
