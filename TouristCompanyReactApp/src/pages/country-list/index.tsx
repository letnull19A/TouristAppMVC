import React, { useEffect, useState } from 'react'
import { countryApi } from '@api'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { TCountry } from '../../entities/country'
import { AdminPageTitle } from '@widgets'
import { useTitle } from '@hooks'

export const CountryList = () => {
	const [countries, setCountries] = useState<Array<TCountry>>([])
	const [selected, setSelected] = useState<Array<TCountry>>([])

	useTitle('Список стран')

	const { getAll } = countryApi

	useEffect(() => {
		getAll().then((res) => {
			setCountries(res)
		})
	}, [getAll])

	const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
		const { newData } = e

		countryApi.edit(newData as TCountry).then(() => {
			getAll().then((res) => {
				setCountries(res)
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
		selected.forEach((selected) => {
			countryApi.delete(selected.id)
		})

		setSelected([])

		setTimeout(() => {
			countryApi.getAll().then((res) => {
				setCountries(res)
			})
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
		countryApi.getAll().then((res) => {
			setCountries(res)
		})
	}

	return (
		countries && (
			<div className="px-4">
				<ConfirmDialog />
				<AdminPageTitle title="Список стран" displayExitButton />
				<div className="card p-fluid">
					<div className="mt-5 flex gap-3mt-5 flex gap-3">
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
						value={countries}
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
	)
}
