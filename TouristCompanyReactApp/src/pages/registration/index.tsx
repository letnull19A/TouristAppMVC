import { registrationApi } from '@api'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type TForm = {
	name: string
	surname: string
	fatherName: string
	email: string
	login: string
	password: string
	rePassword: string
}

export const Registration = () => {
	const defaultValues: TForm = {
		login: '',
		password: '',
		name: '',
		surname: '',
		fatherName: '',
		email: '',
		rePassword: ''
	}

	const { control, handleSubmit, formState } = useForm({ defaultValues })

	const onSubmit = (data: TForm) => {
		if (data.password !== data.rePassword) {
			alert('Пароли не совпадают!')
			return
		}

		registrationApi({
			email: data.email,
			firstName: data.name,
			lastName: data.surname,
			patronymic: data.fatherName,
			password: data.password,
			confirmPassword: data.rePassword
		})
	}

	const navigate = useNavigate()

	return (
		<div className="w-full h-screen flex align-items-center flex-column justify-content-center pt-5">
			<img
				onClick={() => navigate('/')}
				className="m-0-auto mb-2 mt-5 w-7 sm:w-4 md:w-3 lg:w-2"
				src="/logo.svg"
			/>
			<form
				className="col-12 sm:col-8 md:col-6 lg:col-5 lg:max-w-28rem mt-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Card title="Регистрация">
					<Controller
						name="name"
						control={control}
						rules={{ required: 'Введите имя' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваше имя</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="surname"
						control={control}
						rules={{ required: 'Введите фамилию' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваша фамилия</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="fatherName"
						control={control}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>
										Ваше отчество (при наличии)
									</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="email"
						control={control}
						rules={{ required: 'Введите E-Mail' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										type="email"
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваш E-Mail</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="login"
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваш логин</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="password"
						control={control}
						rules={{ required: 'Введите пароль' }}
						render={({ field, fieldState }) => (
							<div className="mt-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={
											classNames({ 'p-invalid': fieldState.error }) + ' w-12'
										}
										onChange={(e) => field.onChange(e.target.value)}
										type="password"
									/>
									<label htmlFor={field.name}>Ваш пароль</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Controller
						name="rePassword"
						control={control}
						rules={{ required: 'Введите пароль' }}
						render={({ field, fieldState }) => (
							<div className="mt-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={
											classNames({ 'p-invalid': fieldState.error }) + ' w-12'
										}
										onChange={(e) => field.onChange(e.target.value)}
										type="password"
									/>
									<label htmlFor={field.name}>Подтвердите пароль</label>
								</span>
								{fieldState.error ? (
									<span>{fieldState.error.message}</span>
								) : null}
							</div>
						)}
					/>
					<Button
						disabled={
							(!formState.isDirty || !formState.isValid) &&
							formState.defaultValues?.password ===
								formState.defaultValues?.rePassword
						}
						label="Зарегистрироваться"
						className="w-12 mt-5"
						value={'d'}
					/>
					<p className="mt-3">
						Есть аккаунт,{' '}
						<span
							className="text-primary"
							style={{ cursor: 'pointer', textDecoration: 'underline' }}
							onClick={() => navigate('/auth')}
						>
							войти
						</span>
					</p>
				</Card>
			</form>
		</div>
	)
}
