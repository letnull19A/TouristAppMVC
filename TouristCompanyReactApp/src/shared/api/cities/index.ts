import { TAddCity, TCity, TEditCity } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TCity>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/city`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddCity): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/city`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: { 'Content-Type': 'application/json' }
	})
}

const getById = async (id: string): Promise<TCity> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/city/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const edit = async (data: TEditCity): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/city/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify({ ...data }),
		headers: { 'Content-Type': 'application/json' }
	})
}

const deleteCity = async (id: string): Promise<void> => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/city/${id}`, {
		method: 'DELETE'
	})
}

export const cityApi: IApiService<TCity, TAddCity, TEditCity> = {
	getAll,
	create,
	getById,
	edit,
	delete: deleteCity
}
