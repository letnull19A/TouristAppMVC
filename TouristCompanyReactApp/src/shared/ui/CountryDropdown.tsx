import { TCountry } from '@entities'
import { useEffect, useState } from 'react'
import { countryApi } from '@api'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type TCountryDropdownProps = {
	defaultValue?: TCountry
	onChange?: (e: DropdownChangeEvent) => void
	className?: string
}

export const CountryDropdown = (props: TCountryDropdownProps) => {
	const { onChange, className, defaultValue } = props

	const [countries, setCountries] = useState<Array<TCountry>>([])
	const [selectedCountry, setSelectedCountry] = useState<TCountry | null>(null)

	useEffect(() => {
		countryApi.getAll().then(setCountries)
		setSelectedCountry(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			value={selectedCountry}
			onChange={(e) => {
				setSelectedCountry(e.value as TCountry)
				onChange?.(e)
			}}
			options={countries}
			optionLabel="name"
			placeholder="Выберете страну"
			className={'w-12 ' + className}
		/>
	)
}
