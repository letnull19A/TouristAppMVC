import { TAddHotelTourForm, TEditHotelTourForm, THotelTour } from '@entities'
import { IApiServiceExtended } from '../IApiService'

const getAll = async (id: string): Promise<Array<THotelTour>> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/${id}/hotel`,
		{
			method: 'GET'
		}
	)
	const data = await response.json()
	return data
}

const getById = async (baseId: string, id: string): Promise<THotelTour> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/${baseId}/hotel/${id}`,
		{
			method: 'GET'
		}
	)
	const data = await response.json()
	return data
}

const create = async (data: TAddHotelTourForm): Promise<Response> => {
	return await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/${data.tourId}/hotel/${
			data.hotelId
		}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

const edit = async (data: TEditHotelTourForm): Promise<Response> => {
	return await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/${data.hotelId}/hotel/${
			data.tourId
		}`,
		{
			method: 'PUT',
			body: JSON.stringify({ newHotelId: data.newHotelId }),
			headers: { 'Content-Type': 'application/json' }
		}
	)
}

const deleteHotelTour = async (baseId: string, id: string) => {
	await fetch(
		`${import.meta.env.VITE_API_URI}/api/tour/${baseId}/hotel/${id}`,
		{
			method: 'DELETE'
		}
	)
}

export const hotelTourApi: IApiServiceExtended<
	THotelTour,
	TAddHotelTourForm,
	TEditHotelTourForm
> = {
	getAll,
	getById,
	create,
	edit,
	delete: deleteHotelTour
}
