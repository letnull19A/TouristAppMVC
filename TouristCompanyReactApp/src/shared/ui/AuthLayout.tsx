import { AuthContext } from '@contexts'
import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthLayout = (props: { children: ReactNode }) => {
	const { children } = props

	const context = useContext(AuthContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (!context.isAuth()) {
			navigate('/')
		}
	}, [context, navigate])

	return (
		<>
			<div
				className="flex justify-content-center mt-4"
				style={{ width: '100%' }}
			>
				<img
					onClick={() => navigate('/')}
					style={{ width: '54px' }}
					src="/logo.svg"
					className="col-1 p-0 m-0"
				/>
			</div>
			<div
				className="flex justify-content-center mt-4"
				style={{ width: '100%' }}
			>
				<div className="col-12 xl:col-9">{children}</div>
			</div>
		</>
	)
}
