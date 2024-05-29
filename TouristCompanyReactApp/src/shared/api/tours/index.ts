import { TAddTourForm, TEditTourForm, TTour } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TTour>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/tour`, {
		method: 'GET'
	})

	const data = await response.json()
	return data
}

const create = async (data: TAddTourForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/tour`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: { 'Content-Type': 'application/json' }
	})
}

const getById = async (id: string): Promise<TTour> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const edit = async (data: TEditTourForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify({ ...data }),
		headers: { 'Content-Type': 'application/json' }
	})
}

const deleteTour = async (id: string) => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${id}`, {
		method: 'DELETE'
	})
}

export const tourApi: IApiService<TTour, TAddTourForm, TEditTourForm> = {
	getAll,
	create,
	getById,
	edit,
	delete: deleteTour
}
