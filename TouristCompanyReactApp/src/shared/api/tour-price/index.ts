import { TAddTourPriceForm, TEditTourPriceForm, TTourPrice } from '@entities'
import { IApiServiceExtended } from '../IApiService'

const getAll = async (id: string): Promise<Array<TTourPrice>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${id}/price`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const getById = async (baseId: string, id: string): Promise<TTourPrice> => {
	return fetch(`${import.meta.env.VITE_API_URI}/api/tour/${baseId}/price/${id}`, {
		method: 'GET'
	}).then((response) => response.json())
}

const create = async (data: TAddTourPriceForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${data.id}/price`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: { 'Content-Type': 'application/json' }
	})
}

const edit = async (data: TEditTourPriceForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${data.tourId}/price/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
}

const removePrice = async (baseId: string, id: string) => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/tour/${baseId}/price/${id}`, {
		method: 'DELETE'
	})
}

export const tourPriceApi: IApiServiceExtended<
	TTourPrice,
	TAddTourPriceForm,
	TEditTourPriceForm
> = {
	getAll,
	getById,
	create,
	edit,
	delete: removePrice
}
