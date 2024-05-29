import { TAddHotelForm, TEditHotelForm, THotel } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<THotel>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/hotel`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddHotelForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/hotel`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const getById = async (id: string): Promise<THotel> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/hotel/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const edit = async (data: TEditHotelForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/hotel/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const deleteHotel = async (id: string) => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/hotel/${id}`, {
		method: 'DELETE'
	})
}

export const hotelApi: IApiService<THotel, TAddHotelForm, TEditHotelForm> = {
	getAll,
	create,
	getById,
	edit,
	delete: deleteHotel
}
