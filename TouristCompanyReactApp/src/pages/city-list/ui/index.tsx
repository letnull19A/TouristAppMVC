import { Column, ColumnEditorOptions } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useState, useEffect } from 'react'
import { TCity, TCountry, TEditCity } from '@entities'
import { cityApi } from '@api'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { CountryDropdown } from '@ui'

export const CityList = () => {
	const [categories, setCategories] = useState<Array<TCity>>([])
	const [selected, setSelectedProducts] = useState<Array<TCity>>([])
	const [country, setCountry] = useState<TCountry | null>(null)

	const { getAll } = cityApi

	useEffect(() => {
		getAll().then((res) => {
			setCategories(res)
		})
	}, [getAll])

	const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
		const { newData } = e

		if (country?.id === undefined) return

		const adaptedData: TEditCity = {
			id: newData.id,
			name: newData.name,
			description: newData.description,
			countryId: country.id
		}

		await cityApi.edit(adaptedData)
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

	const countryDropdown = (options: ColumnEditorOptions) => {
		return (
			<CountryDropdown
				defaultValue={options.rowData.country as TCountry}
				onChange={(e) => {
					setCountry(e.target.value as TCountry)
				}}
			/>
		)
	}

	const handleDelete = () => {
		selected.forEach((item) => {
			cityApi.delete(item.id)
		})

		setSelectedProducts([])

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

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список Городов" />
			<div className="card p-fluid">
				<div className="mt-5">
					<Button
						outlined
						style={{ width: '15%' }}
						label={`Удалить (${selected.length})`}
						severity="danger"
						disabled={selected.length === 0}
						onClick={() => confirm2()}
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
					onSelectionChange={(e) => setSelectedProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column
						field="name"
						header="Название города"
						editor={(options) => textEditor(options)}
						style={{ width: '30%' }}
					/>
					<Column
						field="country.name"
						header="Страна"
						editor={(options) => countryDropdown(options)}
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
