import { TourEditForm } from "@features"
import { AdminPageTitle } from "@widgets"

export const TourEdit = () => {
    return (
        <div className="mt-2">
            <AdminPageTitle title="Редактировать тур" displayExitButton />
            <div className="card flex mt-4 col-5">
                <TourEditForm />
			</div>
        </div>
    )
}