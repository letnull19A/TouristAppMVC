import { TourAddForm } from "@features"
import { AdminPageTitle } from "@widgets"

export const TourCreate = () => {
	return (
		<div className="px-4">
			<AdminPageTitle title="Добавить новый тур" displayExitButton />
			<div className="card flex mt-4 col-5">
                <TourAddForm/>
			</div>
		</div>
	)
}
