type TBaseType = {
	id: string
	name: string
}

export type TOrder = {
	city: TBaseType
	country: TBaseType
	order: {
		id: string
		date: string
		status: string
	}
	tour: TBaseType & { imageUrl: string; description: string }
	tourPrice: {
		id: string
		days: number
		price: number
	}
	user: {
		id: string
		firstName: string
		lastName: string
		patronymic: string
	}
}
