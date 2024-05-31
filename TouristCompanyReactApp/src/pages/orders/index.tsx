import { orderApi } from '@api'
import { TOrder } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

export const Orders = () => {
	// const navigate = useNavigate()
	const [orders, setOrders] = useState<Array<TOrder>>()

	useEffect(() => {
		orderApi.getAll().then((res) => {
			setOrders(res)
		})
	}, [])

	return (
		<>
			<AdminPageTitle title="Список туров" />
			<DataTable
				paginator
				rowsPerPageOptions={[5, 10, 25, 50]}
				value={orders}
				editMode="row"
				rows={5}
				dataKey="id"
				className="pt-4"
				tableStyle={{ minWidth: '50rem' }}
			>
				<Column field="name" header="Название" style={{ width: '20%' }} />
				<Column field="date" header="Дата" style={{ width: '30%' }} />
				<Column field="country.name" header="Страна" style={{ width: '20%' }} />
				<Column field="city.name" header="Город" style={{ width: '30%' }} />
				<Column field="status" header="Статус" style={{ width: '30%' }} />
				<Column
					header="Действия"
					body={() => (
						<>
							<Button label="Принять" link />
							<Button label="Отклонить" link />
						</>
					)}
					headerStyle={{ width: '10%', minWidth: '8rem' }}
					bodyStyle={{ textAlign: 'center' }}
				></Column>
			</DataTable>
		</>
	)
}
