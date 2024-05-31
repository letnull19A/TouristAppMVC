import { TOrder } from '@entities'

const makeOrder = async (data: {
	userId: string
	date: string
	tourPriceId: string
}): Promise<Response> => {
	return (
		await fetch(`${import.meta.env.VITE_API_URI}/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	).json()
}

const getUserOrders = async (userId: string): Promise<Array<TOrder>> => {
	return (
		await fetch(`${import.meta.env.VITE_API_URI}/api/orders/user/${userId}`)
	).json()
}

const getAll = async (): Promise<Array<TOrder>> => {
	return (await fetch(`${import.meta.env.VITE_API_URI}/api/orders`)).json()
}

const cancel = async (id: string): Promise<Response> => {
	return (
		await fetch(`${import.meta.env.VITE_API_URI}/api/orders/${id}/status/CANCEL`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	).json()
}

const accept = async (id: string): Promise<Response> => {
	return (
		await fetch(`${import.meta.env.VITE_API_URI}/api/orders/${id}/status/ACCEPT`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	).json()
}

export const orderApi = { accept, cancel, getUserOrders, makeOrder, getAll }
