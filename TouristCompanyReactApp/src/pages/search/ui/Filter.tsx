import { ticketApi } from '@api'
import { SearchContext } from '@contexts'
import { TAirport } from '@entities'
import { CountryDropdown } from '@ui'
import { Calendar } from 'primereact/calendar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import {
	InputNumber,
	InputNumberValueChangeEvent
} from 'primereact/inputnumber'
import { Nullable } from 'primereact/ts-helpers'
import { useContext, useEffect, useState } from 'react'
import './style.css'
import { Button } from 'primereact/button'

type TAirportsDropdownProps = {
	defaultValue?: TAirport
	onChange?: (e: DropdownChangeEvent) => void
	className?: string
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

	const context = useContext(SearchContext)

	return (
		<>
			<h2 className="mt-2">Опции</h2>
			<div className="flex flex-column gap-5 mt-3">
				<div className="flex flex-column gap-2 p-0">
					<label>Город вылета</label>
					<AirportsDropdown
						className="input-override select-override"
						onChange={(e) => {
							context.setAirportId?.(e.target.value)
						}}
					/>
				</div>
				<div className="flex flex-column gap-2">
					<label>Страна назначения</label>
					<CountryDropdown
						className="input-override select-override"
						onChange={(e) => {
							context.setCountry?.(e.target.value)
						}}
					/>
				</div>
				<div className="flex flex-column gap-2">
					<label>Дата вылета</label>
					<Calendar
						value={dates}
						onChange={(e) => setDates(e.value)}
						selectionMode="single"
						className="calendar input-override"
						readOnlyInput
						hideOnRangeSelection
					/>
				</div>
				<div className="flex flex-column gap-2 p-0">
					<label>Кол-во человек</label>
					<InputNumber
						value={humans}
						className="number-input"
						onValueChange={(e: InputNumberValueChangeEvent) =>
							setHumans(e.target.value ?? 0)
						}
						showButtons
						buttonLayout="horizontal"
						step={1}
						min={1}
						incrementButtonIcon="pi pi-plus"
						decrementButtonIcon="pi pi-minus"
						mode="decimal"
					/>
				</div>
				<div className="flex flex-column gap-2 p-0">
					<label>Кол-во дней</label>
					<InputNumber
						value={days}
						className="number-input"
						onValueChange={(e: InputNumberValueChangeEvent) =>
							setDays(e.target.value ?? 0)
						}
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
				<Button
					className="button-override"
					style={{ height: '45px' }}
					label="Фильтровать"
					icon="pi pi-filter"
				/>
			</div>
		</>
	)
}
