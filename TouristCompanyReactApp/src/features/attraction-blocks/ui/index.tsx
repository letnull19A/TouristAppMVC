import { TAttraction } from '@entities'
import { useEffect, useState } from 'react'
import { AttractionCard } from './AtractionCard'
import './style.css'
import { attractionApi } from '@api'

type TAttractionBlocksProps = {
	cityId?: string
}

export const AttractionBlocks = (props: TAttractionBlocksProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { cityId } = props

	const [attractions, setAttractions] = useState<Array<TAttraction>>([])

	useEffect(() => {
		attractionApi.getAll().then(setAttractions)
	}, [])

	return (
		<div className="attraction-view">
			{attractions.length > 0 &&
				attractions.map((item) => <AttractionCard attraction={item} />)}
		</div>
	)
}
