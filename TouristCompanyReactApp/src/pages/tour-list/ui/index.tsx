import { useEffect, useState } from 'react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { TourDataTable } from '@features'
import { TTour } from '@entities'
import { tourApi } from '@api'
import { AdminPageTitle } from '@widgets'

export const TourList = () => {
	const [selected, setSelected] = useState<Array<TTour>>([])
	const [tours, setTours] = useState<Array<TTour>>([])

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(
				res.map((item) => ({
					...item,
					description: item.description.substring(0, 75) + '...'
				}))
			)
		})
	}, [])

	const handleRefresh = () => {
		tourApi.getAll().then((res) => {
			setTours(
				res.map((item) => ({
					...item,
					description: item.description.substring(0, 75) + '...'
				}))
			)
		})
	}

	const handleDelete = () => {
		selected.forEach((selected) => {
			tourApi.delete(selected.id)
		})

		setSelected([])

		setTimeout(() => {
			handleRefresh()
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
			<AdminPageTitle title="Список туров" displayExitButton />
			<div className="card p-fluid mt-5">
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
				<TourDataTable
					data={tours}
					selected={selected}
					setSelected={setSelected}
				/>
			</div>
		</div>
	)
}
