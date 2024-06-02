import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect, useState } from 'react'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { TUser } from '@entities'
import { userApi } from '@api'
import { AdminPageTitle } from '@widgets'

export const UserList = () => {
	const [users, setUsers] = useState<Array<TUser>>([])
	const [selected, setSelectedProducts] = useState<Array<TUser>>([])

	useEffect(() => {
		userApi.getAll().then(setUsers)
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
		selected.map((user) => {
			userApi.delete(user.id).then()
		})

		userApi.getAll().then(setUsers)
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список пользователей" />
			<div className="card p-fluid">
				<div className="mt-5">
					<Button
						outlined
						label={`Удалить (${selected.length})`}
						severity="danger"
						style={{ width: '15%' }}
						disabled={selected.length === 0}
						onClick={() => confirm2()}
					/>
				</div>
				<DataTable
					paginator
					rowsPerPageOptions={[5, 10, 25, 50]}
					value={users}
					editMode="row"
					rows={10}
					dataKey="id"
					className="pt-4"
					selectionMode="checkbox"
					emptyMessage="Пользователей не найдено"
					selection={selected}
					onSelectionChange={(e) => setSelectedProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column field="firstName" header="Имя" style={{ width: '30%' }} />
					<Column field="lastName" header="Фамилия" style={{ width: '30%' }} />
					<Column
						field="patronymic"
						header="Отчество"
						style={{ width: '30%' }}
					/>
					<Column field="email" header="E-Mail" style={{ width: '30%' }} />
					<Column
						header="Действия"
						rowEditor
						headerStyle={{ width: '10%', minWidth: '8rem' }}
						bodyStyle={{ textAlign: 'center' }}
					></Column>
				</DataTable>
			</div>
		</div>
	)
}
