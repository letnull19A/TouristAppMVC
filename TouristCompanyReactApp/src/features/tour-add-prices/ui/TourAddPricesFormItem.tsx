import { TAddPriceTour } from '@entities'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

type TTourAddPricesFormItemProps = {
	onPriceChange: (id: string, price: number) => void
	onDaysChange: (id: string, days: number) => void
	onDelete: (id: string) => void
	data: TAddPriceTour
	id: string
}

export const TourAddPricesFormItem = (props: TTourAddPricesFormItemProps) => {
	const { onDelete, data, id, onDaysChange, onPriceChange } = props

	return (
		<div className="flex flex-row justify-content-between">
			<InputText
				type="number"
				className="col-5"
				min={0}
				step={1000}
				defaultValue={data.price}
				onChange={(e) => {
					const parcedPrice = Number.parseInt(e.target.value)
					if (parcedPrice > 0) {
						onPriceChange(id, parcedPrice)
					}
				}}
			/>
			<InputText
				type="number"
				className="col-4"
				min={0}
				step={7}
				max={45}
				defaultValue={data.days}
				onChange={(e) => {
					const parcedDays = Number.parseInt(e.target.value)
					if (parcedDays > 0) {
						onDaysChange(id, parcedDays)
					}
				}}
			/>
			<Button
				className="col-2"
				severity="danger"
				label="Удалить"
				onClick={(e) => {
					e.preventDefault()
					onDelete(data.id)
				}}
			/>
		</div>
	)
}
