export type TUser = {
	id: string
	firstName: string
	lastName: string
	patronymic: string
	email: string
}

export type TAddUser = Omit<TUser, 'id'> & {
	login: string
	password: string
	confirmPassword: string
}

export type TEditUser = TUser
