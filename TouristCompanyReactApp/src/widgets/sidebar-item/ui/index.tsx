import { Badge } from 'primereact/badge'
import { useNavigate } from 'react-router-dom'

type TSideBarItemProps = {
	navigatePath: string
	label: string
	iconClass: string
	badge?: boolean
	badgeValue?: string
	severity?: 'success' | 'info' | 'warning' | 'danger' | null | undefined
}

export const SideBarItem = (props: TSideBarItemProps) => {
	const navigate = useNavigate()

	const { navigatePath, label, iconClass, badge, badgeValue, severity } = props

	return (
		<li>
			<a
				type="button"
				onClick={() => navigate(navigatePath)}
				className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full flex flex-row justify-content-between"
			>
				<div>
					<i className={`pi ${iconClass} mr-2`}></i>
					<span className="font-medium">{label}</span>
				</div>
				{badge && <Badge severity={severity} value={badgeValue}></Badge>}
			</a>
		</li>
	)
}
