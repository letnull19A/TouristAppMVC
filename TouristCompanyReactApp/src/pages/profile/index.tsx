import { AuthContext, SearchContext } from '@contexts'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardGrid } from '../search/ui/CardGrid'
import { favouritesApi, tourApi } from '@api'
import { TTour, TAirport, TCountry, TFavourite } from '@entities'

export const Profile = () => {
	const navigate = useNavigate()

	const context = useContext(AuthContext)

	const [tours, setTours] = useState<Array<TTour>>([])
	const [airportId, setAirportId] = useState<TAirport>()
	const [country, setCountry] = useState<TCountry>()
	const [favs, setFavs] = useState<Array<TFavourite>>([])

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})

		if (context.data === undefined) return

		favouritesApi.getAll(context.data?.id).then(setFavs)
	}, [])

	return (
		<div className="flex flex-row">
			<div className="flex flex-column" style={{ width: 260 }}>
				<Avatar
					label={context.data?.firstName[0]}
					style={{ width: 260, height: 260 }}
					size="large"
				/>
				<span style={{ fontSize: 20, marginTop: 20 }}>
					{context.data?.firstName} {context.data?.lastName}
				</span>
				<span style={{ fontSize: 20, marginTop: 10, marginBottom: 20 }}>
					{context.data?.patronymic}
				</span>
				<Button
					onClick={() => navigate('/profile')}
					link
					className="pl-0 border-noround text-left"
					label="Избранное"
				/>
				<Button
					onClick={() => navigate('/orders')}
					link
					className="pl-0 border-noround text-left"
					label="Заявки"
				/>
				<Button
					onClick={() => navigate('/docs')}
					link
					className="pl-0 border-noround text-left"
					label="Справка"
				/>
				<Button
					onClick={() => context.logout()}
					link
					className="pl-0 border-noround text-left"
					label="Выйти"
				/>
				{context.data?.role === 'Администратор' ? (
					<Button
						link
						className="border-noround text-left pl-0"
						label="Панель управления"
						onClick={() => navigate('/tour/list')}
					/>
				) : null}
			</div>
			<div className="ml-5" style={{ width: '100%' }}>
				<SearchContext.Provider
					value={{
						data: tours,
						setData: setTours,
						airport: airportId,
						setAirportId: setAirportId,
						country: country,
						setCountry: setCountry
					}}
				>
					<h1 className="p-0 m-0">Избранное</h1>
					<CardGrid favorites={favs} />
				</SearchContext.Provider>
			</div>
		</div>
	)
}
