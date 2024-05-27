import { TUserData } from '@entities'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { adminRouter, authRouter, publicRouter } from '../chains'
import { AuthContext } from '../contexts/authContext'

export const RouterApp = () => {
	const router = createBrowserRouter([...publicRouter, ...adminRouter, ...authRouter])
	const [userData, setUserData] = useState<TUserData | undefined>(undefined)
	const [isHasAuth, setIsHasAuth] = useState<boolean>(false)

	const logout = () => {
		setUserData(undefined)
		setIsHasAuth(false)
		localStorage.removeItem('userData')
	}

	const isAuth = () => isHasAuth

	useEffect(() => {
		const data = localStorage.getItem('userData')

		if (data) {
			setUserData(JSON.parse(data))
			setIsHasAuth(true)
		} else {
			setIsHasAuth(false)
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				data: userData,
				setData: setUserData,
				logout: logout,
				isAuth: isAuth,
				setIsAuth: setIsHasAuth,
			}}
		>
			<RouterProvider router={router}></RouterProvider>
		</AuthContext.Provider>
	)
}
