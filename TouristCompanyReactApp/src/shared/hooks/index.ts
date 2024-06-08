import { useEffect, useState } from 'react'

export const useTitle = (value: string) => {
	const [title] = useState<string>(value)

	useEffect(() => {
		document.title = title
	}, [title])

	return title
}
