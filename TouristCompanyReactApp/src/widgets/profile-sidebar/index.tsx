import { AuthContext } from "@contexts"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export const ProfileSidebar = () => {

    const navigate = useNavigate()

	const context = useContext(AuthContext)
    
    return (
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
					onClick={() => navigate('/profile/orders')}
					link
					className="pl-0 border-noround text-left"
					label="Заявки"
				/>
				<Button
					onClick={() => window.open('/spravka.pdf', '_blank')}
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
    )
}