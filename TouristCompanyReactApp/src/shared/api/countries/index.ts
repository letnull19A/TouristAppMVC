import { TAddCountryForm, TCountry, TEditCountryForm } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TCountry>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/country`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddCountryForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/country`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const getById = async (id: string): Promise<TCountry> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/country/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const edit = async (data: TEditCountryForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/country/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const deleteById = async (id: string): Promise<void> => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/country/${id}`, {
		method: 'DELETE'
	})
}

export const countryApi: IApiService<
	TCountry,
	TAddCountryForm,
	TEditCountryForm
> = {
	getAll,
	create,
	getById,
	edit,
	delete: deleteById
}
