import { TAttraction } from '@entities'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useNavigate } from 'react-router-dom'

type TAttractionDataTableProps = {
	selected: Array<TAttraction>
	setSelected: (value: TAttraction[]) => void
	data: Array<TAttraction>
}

export const AttractionDataTable = (props: TAttractionDataTableProps) => {
	const { selected, setSelected, data } = props

	const navigate = useNavigate()

	return (
		<DataTable
			paginator
			rowsPerPageOptions={[5, 10, 25, 50]}
			value={data}
			editMode="row"
			rows={10}
			dataKey="id"
			className="pt-4"
			selectionMode="checkbox"
			selection={selected}
			onSelectionChange={(e) => setSelected(e.value)}
			tableStyle={{ minWidth: '50rem' }}
		>
			<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
			<Column field="name" header="Название" style={{ width: '30%' }} />
			<Column field="description" header="Описание" style={{ width: '30%' }} />
			<Column field="city.name" header="Город" style={{ width: '30%' }} />
			<Column field="country.name" header="Страна" style={{ width: '30%' }} />
			<Column
				header="Действия"
				body={(data) => (
					<Button
						onClick={() => {
							navigate(`/attraction/${data.id}/edit`)
						}}
						label="Редактировать"
						link
					/>
				)}
				headerStyle={{ width: '10%', minWidth: '8rem' }}
				bodyStyle={{ textAlign: 'center' }}
			></Column>
		</DataTable>
	)
}
