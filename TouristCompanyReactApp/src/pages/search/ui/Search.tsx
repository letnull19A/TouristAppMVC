import { search } from '@api'
import { SearchContext } from '@contexts'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const context = useContext(SearchContext)

	const handleSearch = async () => {
		if (inputRef === null || inputRef.current === null) return

		console.log(context.airport, context.country)

		const result = await (await search(inputRef.current?.value)).json()

		if (result) {
			console.log(result)

			context.setData(result)
		}
	}

	const navigate = useNavigate()

	return (
		<div className="mb-3 flex flex-row grid">
			<div className="col-fixed" style={{ width: '70px' }}>
				<img
					onClick={() => navigate('/')}
					style={{ width: 54 }}
					src="/logo.svg"
				/>
			</div>
			<div className="col">
				<InputText
					ref={inputRef}
					style={{ height: 54 }}
					placeholder="Введите Ваш запрос"
					className="w-full"
				/>
			</div>
			<div className="col-fixed search-button">
				<Button
					label="Поиск по названию"
					className="w-full search-button__desktop"
					onClick={() => handleSearch()}
				/>
				<Button
					icon='pi pi-search'
					className="w-full search-button__mobile"
					onClick={() => handleSearch()}
				/>
			</div>
		</div>
	)
}
