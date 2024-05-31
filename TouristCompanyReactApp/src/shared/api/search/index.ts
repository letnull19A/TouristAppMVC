export const search = async (
	textSearch: string
): Promise<Response> => {
	return await fetch(
		`${import.meta.env.VITE_API_URI}/api/search?search=${textSearch}`,
		{
			method: 'POST'
		}
	)
}