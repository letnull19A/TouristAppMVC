import { TAttraction } from '@entities'
import './style.css'

type TAttractionCardProps = {
	attraction?: TAttraction
}

export const AttractionCard = (props: TAttractionCardProps) => {
	const { attraction } = props

	return (
		<div className="attraction-card">
			<img
				src={`${import.meta.env.VITE_API_URI}/bucket/${attraction?.imageUrl}`}
				className="attraction-card__cover"
			/>
			<h4 className="attraction-card__title">{attraction?.name}</h4>
            <p className="attraction-card__read-more">Читать подробнее</p>
		</div>
	)
}
