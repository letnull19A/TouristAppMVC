import { AddPriceTourContext } from '@contexts'
import { Button } from 'primereact/button'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TourAddPricesFormItem } from './TourAddPricesFormItem'
import { TAddPriceTour } from '@entities'

type TTourAddPricesFormProps = {
	onDelete?: (id: string) => void
	onEdit?: (data: TAddPriceTour) => void
	onAppend?: (data: TAddPriceTour) => void
}

export const TourAddPricesForm = (props: TTourAddPricesFormProps) => {
	const context = useContext(AddPriceTourContext)
	const { onDelete, onEdit, onAppend } = props

	const hanbleAddToList = () => {
		const data = { id: uuidv4(), price: 0, days: 0 };
		context.setFields([...context.fields, data])
		onAppend?.(data)
	}

	//TODO сделать рефакторинг сдесь когда-нибудь в прекрасном далёком
	const onPriceChange = (id: string, price: number) => {
		const origin = context.fields

		const item = origin.find((item) => item.id === id)
		if (item === undefined) return

		const index = origin.indexOf(item)

		origin[index].price = price

		onEdit?.(origin[index])

		context.setFields(origin)
	}

	const onDaysChange = (id: string, days: number) => {
		const origin = context.fields

		const item = origin.find((item) => item.id === id)
		if (item === undefined) return

		const index = origin.indexOf(item)

		origin[index].days = days

		onEdit?.(origin[index])

		context.setFields(origin)
	}

	const handleDeleteFromList = (id: string) => {
		const origin = context.fields
		const result = origin.filter((r) => r.id !== id)

		onDelete?.(id)

		context.setFields(result)
	}

	return (
		<div className="flex flex-column">
			<p>Добавление цен</p>
			<div className="flex flex-row justify-content-between">
				<span className='col-5'>Цена</span>
				<span className='col-4'>Дни</span>
				<span className='col-2'>Действие</span>
			</div>
			<div className="flex flex-column gap-3 mb-3">
				{context.fields.map((item) => (
					<TourAddPricesFormItem
						key={item.id}
						onPriceChange={onPriceChange}
						onDaysChange={onDaysChange}
						onDelete={handleDeleteFromList}
						data={item}
						id={item.id}
					/>
				))}
			</div>
			<Button
				label="Добавить новый пункт"
				outlined
				onClick={(e) => {
					hanbleAddToList()
					e.preventDefault()
				}}
			/>
		</div>
	)
}
