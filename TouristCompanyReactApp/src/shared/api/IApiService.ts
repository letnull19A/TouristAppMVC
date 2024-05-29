interface IApiServiseBase<C, E> {
	create: (data: C) => Promise<Response>
	edit: (data: E) => Promise<Response>
}

export interface IApiService<T, C, E> extends IApiServiseBase<C, E> {
	getAll: () => Promise<Array<T>>
	getById: (id: string) => Promise<T>
	delete: (id: string) => Promise<void>
}

export interface IApiServiceExtended<T, C, E> extends IApiServiseBase<C, E> {
	getAll: (id: string) => Promise<Array<T>>
	getById: (baseId: string, id: string) => Promise<T>
	delete: (baseId: string, id: string) => Promise<void>
}
