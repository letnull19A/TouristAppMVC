import { TAddFavourite, TFavourite } from '@entities'

const getAll = async (userId: string): Promise<Array<TFavourite>> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/favourite/${userId}`,
		{
			method: 'GET'
		}
	)
	const data = await response.json()
	return data
}

const addFavourite = async (userId: string, tourId: string): Promise<TAddFavourite> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URI}/api/favourite/${userId}/${tourId}`,
		{
			method: 'POST'
		}
	)
	const data = await response.json()
	return data
}

const deleteFavourite = async (userId: string, tourId: string) => {
	await fetch(
		`${import.meta.env.VITE_API_URI}/api/favourite/${userId}/${tourId}`,
		{
			method: 'DELETE'
		}
	)
}

export const favouritesApi = {
	getAll,
	addFavourite,
	delete: deleteFavourite
}
