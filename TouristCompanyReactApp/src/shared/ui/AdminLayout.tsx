import { ReactNode, useContext, useEffect } from 'react'
import { SideBar } from '../../widgets'
import { AuthContext } from '@contexts'
import { useNavigate } from 'react-router-dom'

export const AdminLayout = (props: { children: ReactNode }) => {
	const { children } = props

	const context = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!context.isAuth()) {
			navigate('/')
		}
	}, [context, context.data, navigate])

	return (
		<div className="grid">
			<div
				className="col-5 sm:col-6 md:col-4 lg:col-3 p-0"
				style={{ maxWidth: '350px' }}
			>
				<SideBar />
			</div>
			<div className="col-7 sm:col-6 md:col-8 lg:col-9 p-0 pl-4">
				{children}
			</div>
		</div>
	)
}
