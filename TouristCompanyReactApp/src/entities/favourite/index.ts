export type TFavourite = {
    id: string
	userId: string
    tourId: string
}

export type TAddFavourite = Omit<TFavourite, 'id'>