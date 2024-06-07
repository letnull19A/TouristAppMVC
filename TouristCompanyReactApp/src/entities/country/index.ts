import { TBase } from '../base';
import { TCategory } from '../category'

export type TCountry = TCategory & { imageUrl?: string }

export type TAddCountryForm = { name: string; description: string } & TBase

export type TEditCountryForm = TAddCountryForm
