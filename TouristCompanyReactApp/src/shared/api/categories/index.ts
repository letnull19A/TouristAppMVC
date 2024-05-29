import { TAddCategory, TCategory, TEditCategory } from '@entities'
import { IApiService } from '../IApiService'

const getAll = async (): Promise<Array<TCategory>> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/category`, {
		method: 'GET'
	})
	const data = await response.json()
	return data
}

const create = async (data: TAddCategory): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_URI}/api/category`, {
	method: 'POST',
	body: JSON.stringify({ ...data }),
	headers: { 'Content-Type': 'application/json' },
  });
}

const getById = async (id: string): Promise<TCategory> => {
	const response = await fetch(`${import.meta.env.VITE_API_URI}/api/category/${id}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data
}

const edit = async (data: TEditCategory): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/category/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
}

const deleteCategory = async (id: string): Promise<void> => {
	await fetch(`${import.meta.env.VITE_API_URI}/api/category/${id}`, {
        method: 'DELETE',
    })
}

export const categoryApi: IApiService<TCategory, TAddCategory, TEditCategory> = {
	getAll, 
	create,
	getById,
	edit,
	delete: deleteCategory
}
