import { TAttraction } from '@entities'
import { useEffect, useState } from 'react'
import { AttractionCard } from './AtractionCard'
import './style.css'

type TAttractionBlocksProps = {
	cityId?: string
}

export const AttractionBlocks = (props: TAttractionBlocksProps) => {
	const { cityId } = props

	const [attractions, setAttractions] = useState<Array<TAttraction>>([])

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URI}/api/attraction/city/${cityId}`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then(setAttractions)
	}, [cityId])

	return (
		<div className="attraction-view">
			{attractions.length > 0 &&
				attractions.map((item) => <AttractionCard attraction={item} />)}
		</div>
	)
}
