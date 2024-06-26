import React, { useEffect, useState } from 'react'
import { TCategory, TEditCategory } from '@entities'
import { categoryApi } from '@api'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { AdminPageTitle } from '@widgets'
import { useTitle } from '@hooks'

export const CategoryList = () => {
	const [categories, setCategories] = useState<Array<TCategory>>([])
	const [selected, setSelected] = useState<Array<TCategory>>([])

	useTitle('Список категорий')

	const { getAll, edit, delete: deleteCategory } = categoryApi

	useEffect(() => {
		getAll().then((res) => {
			setCategories(res)
		})
	}, [getAll])

	const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
		const { newData } = e

		edit(newData as TEditCategory).then(() => {
			getAll().then((res) => {
				setCategories(res)
			})
		})
	}

	const textEditor = (options: ColumnEditorOptions) => {
		return (
			<InputText
				type="text"
				value={options.value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					options.editorCallback!(e.target.value)
				}
			/>
		)
	}

	const handleDelete = () => {
		selected.forEach((category) => {
			deleteCategory(category.id)
		})

		setSelected([])

		setTimeout(() => {
			getAll().then(setCategories)
		}, 1000)
	}

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

	const handleRefresh = () => {
		getAll().then(setCategories)
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список категорий" displayExitButton />
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
					onRowEditComplete={onRowEditComplete}
					selectionMode="checkbox"
					selection={selected}
					onSelectionChange={(e) => setSelected(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column
						field="name"
						header="Название"
						editor={(options) => textEditor(options)}
						style={{ width: '30%' }}
					/>
					<Column
						field="description"
						header="Описание"
						editor={(options) => textEditor(options)}
						style={{ width: '30%' }}
					/>
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
