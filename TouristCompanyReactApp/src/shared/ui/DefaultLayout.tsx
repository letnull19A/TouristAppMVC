import { AuthContext } from '@contexts'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const DefaultLayout = (props: { children: ReactNode }) => {
	const { children } = props

	const context = useContext(AuthContext)

	const navigate = useNavigate()

	return (
		<>
			<div
				className="flex justify-content-center col-10"
				style={{ width: '100%', height: '64px' }}
			>
				<div className="col-12 xl:col-9 flex flex-row align-items-center justify-content-end">
					<div>
						{context.isAuth() ? (
							<div className="flex flex-row gap-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
								<Avatar label={context.data?.firstName[0]} size="large" />
								<div className="flex flex-column">
									<span>
										{context.data?.firstName} {context.data?.lastName}
									</span>
									<span>{context.data?.role}</span>
								</div>
								{context.data?.role === 'Администратор' ? (
									<Button
										link
										icon="pi pi-sliders-h"
										label="Панель управления"
										onClick={() => navigate('/tour/list')}
									/>
								) : null}
								<Button
									icon="pi pi-sign-out"
									link
									label="Выйти"
									onClick={() => context.logout()}
								/>
							</div>
						) : (
							<>
								<Button
									text
									icon="pi pi-user"
									label="Войти в аккаунт"
									link
									onClick={() => navigate('/auth')}
								/>
								<Button
									text
									icon="pi pi-key"
									label="Регистрация"
									link
									onClick={() => navigate('/registration')}
								/>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-content-center" style={{ width: '100%' }}>
				<div className="col-12 xl:col-9">{children}</div>
			</div>
		</>
	)
}
