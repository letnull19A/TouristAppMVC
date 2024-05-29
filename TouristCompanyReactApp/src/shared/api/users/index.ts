import { TAddUser, TEditUser, TUser } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TUser>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/user`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const getById = async (id: string): Promise<TUser> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/user/${id}`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddUser): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/user`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const edit = async (data: TEditUser): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/user/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const deleteUser = async (id: string) => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/user/${id}`, {
		method: 'DELETE'
	})
}

export const userApi: IApiService<TUser, TAddUser, TEditUser> = {
	getAll,
	getById,
	create,
	edit,
	delete: deleteUser
}
