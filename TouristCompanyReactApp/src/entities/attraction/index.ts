import { TBase } from '../base'

export type TAttraction = {
	id: string
	name: string
	city: { id: string; name: string }
	country: { id: string; name: string }
	description: string
	imageUrl: string
}

export type TAddAttractionForm = {
	cityId: string
	name: string
	description: string
}

export type TEditAttractionForm = Omit<TAddAttractionForm, 'cityId'> &
	TBase & { cityId: string; imageUrl: string }
