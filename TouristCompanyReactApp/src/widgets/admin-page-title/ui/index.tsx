import { AuthContext } from '@contexts'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

type TAdminPAgeTitleProps = {
	title: string
	toMain?: boolean
	displayUser?: boolean
}

export const AdminPageTitle = (props: TAdminPAgeTitleProps) => {
	const { title, toMain } = props

	const navigate = useNavigate()

	const context = useContext(AuthContext)

	const confirm2 = () => {
		confirmDialog({
			message: `Вы действительно хотите выйти?`,
			header: 'Подтверждение действий',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			rejectLabel: 'Нет',
			acceptLabel: 'Да',
			accept: () => context.logout()
		})
	}

	return (
		<div style={{ width: '100%' }}>
			<div className="flex align-items-center justify-content-between pt-4 flex-shrink-0">
				<span className="inline-flex align-items-center gap-2">
					{toMain && (
						<Button
							label="На главную"
							link
							onClick={() => navigate('/')}
							className="font-medium px-0 mr-3"
							icon="pi pi-angle-left"
						/>
					)}
					<span className="font-semibold text-2xl text-primary">{title}</span>
				</span>
				<Button onClick={() => confirm2()}>Выйти</Button>
			</div>
		</div>
	)
}
