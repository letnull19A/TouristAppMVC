import { RouteObject } from 'react-router-dom'
import {
	Favourite,
	Profile
} from '@pages'
import { AuthLayout } from '@ui'

export const authRouter: RouteObject[] = [
	{
		path: '/profile',
		element: (
            <AuthLayout>
                <Profile />
            </AuthLayout>
        )
	},
	{
		path: '/favourite',
		element: (
			<AuthLayout>
				<Favourite />
			</AuthLayout>
		)		
	}
]
