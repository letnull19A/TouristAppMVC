import { StyleClass } from 'primereact/styleclass'
import { useRef } from 'react'
import { SideBarItem } from './../../sidebar-item'
import { useNavigate } from 'react-router-dom'

export function SideBar() {
	const btnRef2 = useRef(null)
	const btnRef5 = useRef(null)
	const btnRef6 = useRef(null)
	const btnRef7 = useRef(null)
	const btnRef8 = useRef(null)
	const btnRef9 = useRef(null)
	const btnRef10 = useRef(null)

	const navigate = useNavigate()

	return (
		<div
			className="min-h-screen flex fixed p-0 col-6 sm:col-7 md:col-5 lg:col-4 p-0"
			style={{ maxWidth: '350px', backgroundColor: 'var(--surface-200)' }}
		>
			<div
				id="app-sidebar-2"
				className="h-screen hidden block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none col-12"
			>
				<div className="flex flex-column h-full">
					<div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
						<span className="inline-flex align-items-center gap-2">
							<span className="font-semibold text-2xl text-primary flex align-items-center gap-3">
								<img
									onClick={() => navigate('/')}
									style={{ width: '40px', cursor: 'pointer' }}
									src="/logo.svg"
									className="col-1 p-0 m-0"
								/>
								Панель управления
							</span>
						</span>
					</div>
					<div className="overflow-y-auto">
						<ul className="list-none p-3 m-0">
							<li>
								<ul className="list-none p-0 m-0 overflow-hidden">
									<li>
										<StyleClass
											nodeRef={btnRef5}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef5}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-users mr-2"></i>
												<span className="font-medium">Пользователи</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/users/list"
												label="Список"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef9}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef9}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-hashtag mr-2"></i>
												<span className="font-medium">Категории</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/categories/list"
												label="Список"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/categories/create"
												label="Добавить"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef6}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef6}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-bookmark mr-2"></i>
												<span className="font-medium">Туры</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/tour/list"
												label="Список туров"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/tour/create"
												label="Создать новый тур"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef2}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef2}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-map-marker mr-2"></i>
												<span className="font-medium">Локации</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/country/list"
												label="Список стран"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/country/create"
												label="Добавить страну"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/city/list"
												label="Список городов"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/city/create"
												label="Добавить город"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef8}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef8}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-map mr-2"></i>
												<span className="font-medium">
													Достопримечательности
												</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/attraction/list"
												label="Список"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/attraction/create"
												label="Добавить"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef7}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef7}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-home mr-2"></i>
												<span className="font-medium">Отели</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/hotels/list"
												label="Список отелей"
											/>
											<SideBarItem
												iconClass=""
												navigatePath="/hotels/create"
												label="Добавить отель"
											/>
										</ul>
									</li>
									<li>
										<StyleClass
											nodeRef={btnRef10}
											selector="@next"
											enterClassName="hidden"
											enterActiveClassName="slidedown"
											leaveToClassName="hidden"
											leaveActiveClassName="slideup"
										>
											<a
												ref={btnRef10}
												className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
											>
												<i className="pi pi-book mr-2"></i>
												<span className="font-medium">Заявки</span>
												<i className="pi pi-chevron-down ml-auto mr-1"></i>
											</a>
										</StyleClass>
										<ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
											<SideBarItem
												iconClass=""
												navigatePath="/order/list"
												label="Все заявки"
											/>
											{/* <SideBarItem
												iconClass=""
												navigatePath="/hotels/create"
												label="Заявки на рассмотрение"
												badge
												badgeValue='9'
												severity={'danger'}
											/> */}
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
