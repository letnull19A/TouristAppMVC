import { TAddAttractionForm, TAttraction, TEditAttractionForm } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TAttraction>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/attraction`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddAttractionForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/attraction`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const getById = async (id: string): Promise<TAttraction> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/attraction/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const edit = async (data: TEditAttractionForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/attraction/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
}

const deleteAttraction = async (id: string): Promise<void> => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/attraction/${id}`, {
		method: 'DELETE'
	})
}

export const attractionApi: IApiService<TAttraction, TAddAttractionForm, TEditAttractionForm> = {
	getAll,
	create,
	getById,
	edit,
	delete: deleteAttraction
}
