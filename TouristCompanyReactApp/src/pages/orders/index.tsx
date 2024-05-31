import { orderApi } from '@api'
import { TOrder } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
	const navigate = useNavigate()
	const [orders, setOrders] = useState<Array<TOrder>>()

	const toast = useRef<Toast>(null)

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

	const loadData = () => {
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
	}

	useEffect(() => {
		loadData()
	}, [])

	const handleAccept = (id: string) => {
		orderApi.accept(id).then((res) => {
			console.log(res)
			loadData()
		})
	}

	const handleCancel = (id: string) => {
		orderApi.cancel(id).then((res) => {
			console.log(res)
			loadData()
		})
	}

	const showInfo = () => {
		toast.current?.show({
			severity: 'info',
			summary: 'Инфо',
			detail: 'Изменён статус заявки',
			life: 3000
		})
	}

	return (
		<>
			<Toast ref={toast} />
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
				<Column
					field="user.label"
					header="Пользователь"
					style={{ width: '30%' }}
				/>
				<Column
					header="Тур"
					align={'center'}
					body={(data) => {
						return (
							<div className="flex flex-column gap-2">
								<Button
									outlined
									icon={'pi pi-eye'}
									label="Посмотреть"
									onClick={() => {
										navigate(`/tour/${data.tour.id}/view`)
									}}
								/>
							</div>
						)
					}}
				/>
				<Column field="order.status" header="Статус" style={{ width: '30%' }} />
				<Column
					header="Действия"
					align={'center'}
					body={(data) => (
						<div className="flex flex-column gap-2">
							{data.order.status !== 'ACCEPT' ? (
								<Button
									outlined
									severity="success"
									icon={'pi pi-check'}
									label="Принять"
									onClick={() => {
										handleAccept(data.order.id)
										showInfo()
									}}
								/>
							) : null}
							{data.order.status !== 'CANCEL' ? (
								<Button
									outlined
									severity="danger"
									icon={'pi pi-times'}
									label="Отклонить"
									onClick={() => {
										handleCancel(data.order.id)
										showInfo()
									}}
								/>
							) : null}
						</div>
					)}
					headerStyle={{ width: '10%', minWidth: '8rem' }}
					bodyStyle={{ textAlign: 'center' }}
				></Column>
			</DataTable>
		</>
	)
}
