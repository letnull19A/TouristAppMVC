import { Controller, useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { useTitle } from '@hooks'

type TForm = {
	name: string
	surname: string
	fatherName: string
	patronName: string
	email: string
}

export const UserCreate = () => {
	const defaultValues: TForm = {
        name: '',
        surname: '',
        fatherName: '',
        patronName: '',
        email: ''
    }

	useTitle('Регистрация')

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues })

	const onSubmit = (data: TForm) => {
		data.name

		reset()
	}

	return (
		<div className="px-4">
			<div className="flex align-items-center pt-3 flex-shrink-0">
				<span className="inline-flex align-items-center gap-2">
					<span className="font-semibold text-2xl text-primary">
						Зарегистрировать нового пользователя
					</span>
				</span>
			</div>
			<div className="card flex mt-4">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-column gap-4"
				>
					<div className="flex gap-4 mt-4">
						<Controller
							name="name"
							control={control}
							rules={{ required: 'Имя не введено' }}
							render={({ field, fieldState }) => (
								<div>
									<label
										htmlFor={field.name}
										className={classNames({ 'p-error': errors.name })}
									></label>
									<span className="p-float-label">
										<InputText
											id={field.name}
											className={classNames({ 'p-invalid': fieldState.error })}
											onChange={(e) => field.onChange(e.target.value)}
										/>
										<label htmlFor={field.name}>Имя</label>
									</span>
								</div>
							)}
						/>
						<Controller
							name="surname"
							control={control}
							rules={{ required: 'Фамилия не введена' }}
							render={({ field, fieldState }) => (
								<div>
									<label
										htmlFor={field.name}
										className={classNames({ 'p-error': errors.surname })}
									></label>
									<span className="p-float-label">
										<InputText
											id={field.name}
											className={classNames({ 'p-invalid': fieldState.error })}
											onChange={(e) => field.onChange(e.target.value)}
										/>
										<label htmlFor={field.name}>Фамилия</label>
									</span>
								</div>
							)}
						/>
					</div>
					<Controller
						name="patronName"
						control={control}
						render={({ field, fieldState }) => (
							<div style={{ width: '100%' }}>
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										style={{ width: '100%' }}
										className={classNames({ 'p-invalid': fieldState.error })}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Отчество (при наличии)</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="email"
						control={control}
						rules={{ required: 'E-Mail не введён' }}
						render={({ field, fieldState }) => (
							<div style={{ width: '100%' }}>
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										type="email"
										style={{ width: '100%' }}
										className={classNames({ 'p-invalid': fieldState.error })}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>E-Mail</label>
								</span>
							</div>
						)}
					/>
					<Button label="Зарегистрировать" type="submit" icon="pi pi-check" />
				</form>
			</div>
		</div>
	)
}
