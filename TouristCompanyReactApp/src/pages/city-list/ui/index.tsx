import { cityApi } from '@api'
import { TCity, TCountry, TEditCity } from '@entities'
import { CountryDropdown } from '@ui'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { useEffect, useRef, useState } from 'react'

export const CityList = () => {
	const [cities, setCities] = useState<Array<TCity>>([])
	const [selected, setSelectedProducts] = useState<Array<TCity>>([])
	const [country, setCountry] = useState<TCountry | null>(null)

	const { getAll } = cityApi

	const toast = useRef<Toast>(null)

	useEffect(() => {
		getAll().then((res) => {
			setCities(res)
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

		const response = await cityApi.edit(adaptedData)

		if (response.status === 204) {
			toast.current?.show({
				severity: 'success',
				summary: 'Успех',
				detail: 'Изменения сохранены'
			})

			setTimeout(() => {
				getAll().then((res) => {
					setCities(res)
				})
			}, 1000)
		}

		if (response.status === 400) {
			toast.current?.show({
				severity: 'error',
				summary: 'Ошибка',
				detail: response.statusText
			})
		}
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

	const textAreaEditor = (options: ColumnEditorOptions) => {
		return (
			<InputTextarea
				value={options.value}
				rows={8}
				style={{ resize: 'vertical' }}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
					// options.editorCallback!(e.target.value as TCountry)
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
			getAll().then(setCities)
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
			<AdminPageTitle title="Список Городов" displayExitButton />
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
					value={cities}
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
						editor={(options) => textAreaEditor(options)}
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
