import { TCity, TCountry } from '@entities'
import { useEffect, useState } from 'react'
import { cityApi } from '@api'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type TCityDropdownProps = {
	defaultValue?: TCity
	onChange?: (e: DropdownChangeEvent) => void
	country?: TCountry
}

export const CityDropdown = (props: TCityDropdownProps) => {
	const { onChange, defaultValue, country } = props
	const [cities, setCities] = useState<Array<TCity>>([])
	const [selectedCity, setSelectedCity] = useState<TCity | null>(null)

	useEffect(() => {
		if (country === undefined) {
			cityApi.getAll().then((res) => setCities(res))
		} else {
			fetch(`${import.meta.env.VITE_API_URI}/api/country/${country.id}/cities`)
				.then((res) => res.json())
				.then((res) => setCities(res as Array<TCity>))
		}
		setSelectedCity(defaultValue ?? null)
	}, [country, defaultValue])

	return (
		<Dropdown
			value={selectedCity}
			onChange={(e) => {
				setSelectedCity(e.value)
				onChange?.(e)
			}}
			options={cities}
			optionLabel="name"
			placeholder="Выберете город"
			className="w-12"
		/>
	)
}
