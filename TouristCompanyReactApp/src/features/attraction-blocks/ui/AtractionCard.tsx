import { TAttraction } from '@entities'
import './style.css'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'

type TAttractionCardProps = {
	attraction?: TAttraction
}

export const AttractionCard = (props: TAttractionCardProps) => {
	const { attraction } = props
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<>
			<Dialog
				header={attraction?.name}
				visible={visible}
				draggable={false}
				style={{ width: '30vw', borderRadius: 15 }}
				onHide={() => {
					if (!visible) return
					setVisible(false)
				}}
			>
				<p className="m-0">{attraction?.description}</p>
			</Dialog>
			<div className="attraction-card" onClick={() => setVisible(true)}>
				<img
					src={`${import.meta.env.VITE_API_URI}/bucket/${attraction?.imageUrl}`}
					className="attraction-card__cover"
				/>
				<h4 className="attraction-card__title">{attraction?.name}</h4>
				<p className="attraction-card__description">
					{attraction?.description.substring(0, 60)}...
				</p>
				<p
					onClick={() => setVisible(true)}
					className="attraction-card__read-more"
				>
					Читать подробнее
				</p>
			</div>
		</>
	)
}
