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

const cancelOrder = async (): Promise<Response> => {
	return (await fetch(`${import.meta.env.VITE_API_URI}/api/orders`)).json()
}

const acceptOrder = async (): Promise<Response> => {
	return (await fetch(`${import.meta.env.VITE_API_URI}/api/orders`)).json()
}

export { acceptOrder, cancelOrder, getUserOrders, makeOrder }
