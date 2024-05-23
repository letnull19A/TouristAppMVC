import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

type TAdminPAgeTitleProps = {
	title: string
	toMain?: boolean
}

export const AdminPageTitle = (props: TAdminPAgeTitleProps) => {
	const { title, toMain } = props

	const navigate = useNavigate()

	return (
		<div className="flex align-items-center pt-4 flex-shrink-0">
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
		</div>
	)
}
