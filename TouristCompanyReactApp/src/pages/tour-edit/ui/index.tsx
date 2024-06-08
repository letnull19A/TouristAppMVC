import { TourEditForm } from "@features"
import { useTitle } from "@hooks"
import { AdminPageTitle } from "@widgets"

export const TourEdit = () => {

    useTitle('Редактирование теров')
    
    return (
        <div className="mt-2">
            <AdminPageTitle title="Редактировать тур" displayExitButton />
            <div className="card flex mt-4 col-5">
                <TourEditForm />
			</div>
        </div>
    )
}