import { TBase } from '@entities'

export type TTour = {
	id: string
	name: string
	description: string
	city: { name: string } & TBase
	country: { name: string } & TBase
	category: { name: string } & TBase
	imageUrl: string
} & TBase

export type TAddTourForm = Omit<
	TTour,
	'id' | 'country' | 'city' | 'category'
> & {
	countryId: string
	cityId: string
	categoryId: string,
}

export type TEditTourForm = Omit<TTour, 'country' | 'city' | 'category'> & {
	cityId: string
	countryId: string
	categoryId: string
}
