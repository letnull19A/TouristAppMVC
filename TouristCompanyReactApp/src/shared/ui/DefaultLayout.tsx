import { AuthContext } from '@contexts'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Sidebar } from 'primereact/sidebar'
import { ReactNode, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter } from './../../pages/search/ui/Filter'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

export const DefaultLayout = (props: { children: ReactNode }) => {
	const { children } = props

	const context = useContext(AuthContext)

	const [visible, setVisible] = useState<boolean>(false)

	const navigate = useNavigate()

	const op = useRef<OverlayPanel>(null)

	const confirm2 = () => {
		confirmDialog({
			message: `Вы действительно хотите завершить сессию?`,
			header: 'Подтверждение действий',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			acceptClassName: 'p-button-danger',
			rejectLabel: 'Нет',
			acceptLabel: 'Да',
			accept: () => context.logout()
		})
	}

	return (
		<>
			<ConfirmDialog />
			<div
				className="flex justify-content-center col-10"
				style={{ width: '100%', height: '64px' }}
			>
				<Sidebar visible={visible} onHide={() => setVisible(false)}>
					<Filter/>
				</Sidebar>
				<div className="col-12 lg:col-12 xl:col-11 flex flex-row align-items-center justify-content-end">
					<div className="flex w-full justify-content-between md:justify-content-end">
						<Button
							icon="pi pi-bars"
							className="block md:hidden"
							onClick={() => setVisible(true)}
							style={{ width: '54px' }}
						/>
						{context.isAuth() ? (
							<div
								className="flex flex-column gap-3"
								style={{ cursor: 'pointer' }}
							>
								<div
									className="flex flex-row"
									onClick={(e) => {
										op.current?.toggle(e)
									}}
								>
									<Avatar label={context.data?.firstName[0]} size="large" />
									<div className="hidden md:flex flex-column ml-3">
										<span className='text-lg font-medium line-height-2 text-primary'>
											{context.data?.firstName} {context.data?.lastName}
										</span>
										<span className='text-black-alpha-60'>{context.data?.role}</span>
									</div>
								</div>
								<OverlayPanel ref={op}>
									<div className="flex flex-column justify-content-start w-full">
										<Button
											link
											style={{ textAlign: 'left' }}
											icon="pi pi-user"
											label="Профиль"
											onClick={() => navigate('/profile')}
										/>
										<Button
											link
											style={{ textAlign: 'left' }}
											icon="pi pi-eye"
											label="Заявки"
											onClick={() => navigate('/profile/orders')}
										/>
										{context.data?.role === 'Администратор' ? (
											<Button
												style={{ textAlign: 'left' }}
												link
												icon="pi pi-sliders-h"
												label="Панель управления"
												onClick={() => navigate('/tour/list')}
											/>
										) : null}
										<Button
											icon="pi pi-sign-out"
											style={{ textAlign: 'left' }}
											link
											label="Выйти"
											onClick={() => confirm2()}
										/>
									</div>
								</OverlayPanel>
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
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-content-center" style={{ width: '100%' }}>
				<div className="col-12 lg:col-12 xl:col-11">{children}</div>
			</div>
		</>
	)
}
