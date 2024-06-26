import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { TAttraction } from '@entities'
import { AttractionDataTable } from '@features'
import { attractionApi } from '@api'
import { AdminPageTitle } from '@widgets'
import { useTitle } from '@hooks'

export const AttractionList = () => {
	const [selected, setSelectedProducts] = useState<Array<TAttraction>>([])
	const [attractions, setAttractions] = useState<Array<TAttraction>>([])

	useTitle('Список достопримечательностей')

	useEffect(() => {
		attractionApi.getAll().then(setAttractions)
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
		selected.map((attraction) => {
			attractionApi.delete(attraction.id)
		})

		setSelectedProducts([])

		setTimeout(() => {
			attractionApi.getAll().then(setAttractions)
		}, 1000)
	}

	const handleRefresh = () => {
		attractionApi.getAll().then(setAttractions)
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список достопримечательностей" displayExitButton />
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
				<AttractionDataTable
					data={attractions}
					selected={selected}
					setSelected={setSelectedProducts}
				/>
			</div>
		</div>
	)
}
