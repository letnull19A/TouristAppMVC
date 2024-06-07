import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { AdminPageTitle } from '../../../widgets'
import { categoryApi } from '@api'

type TForm = {
	id: string
	name: string
	description: string
}

export const CategoryCreate = () => {
	const toast = useRef<Toast>(null)
	const { create } = categoryApi

	const defaultValues: TForm = {
		id: '',
		name: '',
		description: ''
	}

	const { control, handleSubmit, reset } = useForm({ defaultValues })

	const showSuccess = () => {
		toast.current?.show({
			severity: 'success',
			summary: 'Успех!',
			detail: 'Достопримечательность успешно добавлен!',
			life: 3000
		})
	}

	const onSubmit = async (data: TForm) => {
		await create(data).then(() => {
			showSuccess()
		})

		reset()
	}

	return (
		<div className="px-4">
			<Toast ref={toast} />
			<AdminPageTitle title='Добавить категорию' displayExitButton />
			<div className="card flex mt-4 col-5">
				<Toast ref={toast} />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-column gap-40"
					style={{ width: '100%' }}
				>
					<Controller
						name="name"
						control={control}
						rules={{ required: 'Название не введено' }}
						render={({ field, fieldState }) => (
							<div style={{ width: '100%' }}>
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Название</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="description"
						control={control}
						rules={{ required: 'Описнаие не введено' }}
						render={({ field, fieldState }) => (
							<span className="p-float-label mt-5">
								<InputTextarea
									id={field.name}
									{...field}
									rows={4}
									cols={30}
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
								/>
								<label htmlFor={field.name}>Описание</label>
							</span>
						)}
					/>
					<Button
						className="mt-5"
						label="Подтвердить"
						type="submit"
						icon="pi pi-check"
					/>
				</form>
			</div>
		</div>
	)
}
