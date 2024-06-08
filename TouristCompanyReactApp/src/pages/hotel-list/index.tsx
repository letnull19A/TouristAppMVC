import { hotelApi } from '@api'
import { THotel } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const HotelList = () => {
	const [categories, setCategories] = useState<Array<THotel>>([])
	const [selected, setSelectedProducts] = useState<Array<THotel>>([])

	const navigate = useNavigate()

	useEffect(() => {
		hotelApi.getAll().then((res) => {
			setCategories(res)
		})
	}, [])

	const confirm2 = () => {
		confirmDialog({
			message: `Вы действительно хотите удалить ${selected.length} записей?`,
			header: 'Подтверждение действий',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			acceptClassName: 'p-button-danger',
			rejectLabel: 'Нет',
			acceptLabel: 'Да',
			accept: handleDelete
		})
	}

	const handleDelete = () => {
		selected.forEach((item) => {
			hotelApi.delete(item.id)
		})

		setSelectedProducts([])

		setTimeout(() => {
			hotelApi.getAll().then(setCategories)
		}, 1000)
	}

	const handleRefresh = () => {
		hotelApi.getAll().then(setCategories)
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список отелей" displayExitButton />
			<div className="card p-fluid">
				<div className="mt-5 flex gap-3">
					<Button
						outlined
						style={{ width: '15%' }}
						label={`Удалить (${selected.length})`}
						severity="danger"
						icon={'pi pi-trash'}
						disabled={selected.length === 0}
						onClick={() => confirm2()}
					/>
					<Button
						outlined
						style={{ width: '15%' }}
						label={`Обновить`}
						severity="success"
						icon={'pi pi-refresh'}
						onClick={() => handleRefresh()}
					/>
				</div>
				<DataTable
					paginator
					rowsPerPageOptions={[5, 10, 25, 50]}
					value={categories}
					editMode="row"
					rows={10}
					dataKey="id"
					className="pt-4"
					selectionMode="checkbox"
					selection={selected}
					onSelectionChange={(e) => setSelectedProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column field="name" header="Название" style={{ width: '30%' }} />
					<Column
						field="country.name"
						header="Страна"
						style={{ width: '30%' }}
					/>
					<Column
						field="city.name"
						header="Город"
						style={{ width: '30%' }}
					></Column>
					<Column
						field="rating"
						header="Рейтинг"
						style={{ width: '15%' }}
					></Column>
					<Column
						header="Действия"
						body={(data) => (
							<Button
								onClick={() => {
									navigate(`/hotels/${data.id}/edit`)
								}}
								label="Редактировать"
								link
							/>
						)}
						headerStyle={{ width: '10%', minWidth: '8rem' }}
						bodyStyle={{ textAlign: 'center' }}
					></Column>
				</DataTable>
			</div>
		</div>
	)
}
