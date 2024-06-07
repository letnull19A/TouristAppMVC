import { TAirport, TCountry, TTour } from '@entities'
import { createContext } from 'react'

type TContext = {
	data: Array<TTour>
	setData: (value: Array<TTour>) => void
	search?: string | undefined
	setSearch?: (value: string) => void
	airport?: TAirport | undefined
	setAirportId?: (value: TAirport) => void
	country?: TCountry | undefined
	setCountry?: (value: TCountry) => void
	humans?: number
	setHumans?: (value: number) => void
	days?: number,
	setDays?: (value: number) => void
}

export const SearchContext = createContext<TContext>({
	data: [],
	setData: () => {},
	search: '',
    setSearch: () => {},
	airport: undefined,
	setAirportId: () => {},
	country: undefined,
	setCountry: () => {},
	humans: 1,
    setHumans: () => {},
	days: 1,
    setDays: () => {}
})
