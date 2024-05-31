import { OrderList, Profile } from '@pages'
import { AuthLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const authRouter: RouteObject[] = [
	{
		path: '/profile',
		children: [
			{
				path: '',
				element: (
					<AuthLayout>
						<Profile />
					</AuthLayout>
				)
			},
			{
				path: 'orders',
				element: (
					<AuthLayout>
						<OrderList />
					</AuthLayout>
				)
			}
		]
	}
]
