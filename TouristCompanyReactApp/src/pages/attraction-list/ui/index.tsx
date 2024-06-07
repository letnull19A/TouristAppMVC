import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { TAttraction } from '@entities'
import { AttractionDataTable } from '@features'
import { attractionApi } from '@api'
import { AdminPageTitle } from '@widgets'

export const AttractionList = () => {
	const [selected, setSelectedProducts] = useState<Array<TAttraction>>([])
	const [attractions, setAttractions] = useState<Array<TAttraction>>([])

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

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список достопримечательностей" displayExitButton />
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
				<AttractionDataTable
					data={attractions}
					selected={selected}
					setSelected={setSelectedProducts}
				/>
			</div>
		</div>
	)
}
