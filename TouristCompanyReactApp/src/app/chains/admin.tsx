import {
	AttractionCreate,
	AttractionEdit,
	AttractionList,
	CategoryCreate,
	CategoryList,
	CityCreate,
	CityList,
	CountryCreate,
	CountryList,
	HotelCreate,
	HotelEdit,
	HotelList,
	Orders,
	TourCreate,
	TourEdit,
	TourList,
	UserCreate,
	UserList
} from '@pages'
import { AdminLayout } from '@ui'
import { RouteObject } from 'react-router-dom'

export const adminRouter: RouteObject[] = [
	{
		path: '/attraction',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<AttractionList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<AttractionCreate />
					</AdminLayout>
				)
			},
			{
				path: ':id/edit',
				element: (
					<AdminLayout>
						<AttractionEdit />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/order',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<Orders />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/country',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<CountryList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<CountryCreate />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/city',
		children: [
			{
				path: 'create',
				element: (
					<AdminLayout>
						<CityCreate />
					</AdminLayout>
				)
			},
			{
				path: 'list',
				element: (
					<AdminLayout>
						<CityList />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/categories',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<CategoryList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<CategoryCreate />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/hotels',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<HotelList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<HotelCreate />
					</AdminLayout>
				)
			},
			{
				path: ':id/edit',
				element: (
					<AdminLayout>
						<HotelEdit />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/users',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<UserList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<UserCreate />
					</AdminLayout>
				)
			}
		]
	},
	{
		path: '/tour',
		children: [
			{
				path: 'list',
				element: (
					<AdminLayout>
						<TourList />
					</AdminLayout>
				)
			},
			{
				path: 'create',
				element: (
					<AdminLayout>
						<TourCreate />
					</AdminLayout>
				)
			},
			{
				path: ':id/edit',
				element: (
					<AdminLayout>
						<TourEdit />
					</AdminLayout>
				)
			}
		]
	}
]
