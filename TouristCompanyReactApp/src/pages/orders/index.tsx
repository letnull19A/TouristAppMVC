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

	const renderStatus = (status: string) => {
		switch (status) {
			case 'AWAIT':
				return 'На рассмотрении'
			case 'ACCEPT':
				return 'Принята'
			case 'REJECT':
				return 'Отклонена'
			case 'CANCEL':
				return 'Отменена'
			default:
				return 'Неизвестно'
		}
	}

	useEffect(() => {
		orderApi.getAll().then((res) => {
			setOrders(
				res.map((item) => {
					return {
						...item,
						order: {
							...item.order,
							status: renderStatus(item.order.status),
							date: new Date(item.order.date).toLocaleDateString()
						},
						user: {
							...item.user,
							label:
								item.user.firstName +
								' ' +
								item.user.lastName +
								' ' +
								item.user.patronymic
						}
					}
				})
			)
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
				<Column field="tour.name" header="Название" style={{ width: '20%' }} />
				<Column field="order.date" header="Дата" style={{ width: '10%' }} />
				<Column field="country.name" header="Страна" style={{ width: '10%' }} />
				<Column field="city.name" header="Город" style={{ width: '15%' }} />
				<Column field="user.label" header="Город" style={{ width: '30%' }} />
				<Column field="order.status" header="Статус" style={{ width: '30%' }} />
				<Column
					header="Действия"
					align={'center'}
					body={({ data }) => (
						<div className="flex flex-column gap-2">
							{JSON.stringify(data)}
							<Button
								outlined
								severity="success"
								icon={'pi pi-check'}
								label="Принять"
							/>
							<Button
								outlined
								severity="danger"
								icon={'pi pi-times'}
								label="Отклонить"
							/>
						</div>
					)}
					headerStyle={{ width: '10%', minWidth: '8rem' }}
					bodyStyle={{ textAlign: 'center' }}
				></Column>
			</DataTable>
		</>
	)
}
