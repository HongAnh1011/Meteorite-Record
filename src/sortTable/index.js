export const sortTable = (data, sortKey, direction) => {
	const reverse = direction === 'ascending' ? 1: -1;
	const so = data.sort((nameA, nameB) => {
		const isString = Number.isNaN(Number(nameA))
		if (isString) {
			if (nameA?.[sortKey]?.toUpperCase() < nameB?.[sortKey]?.toUpperCase()) {
				return -1 * reverse;
			}
			if (nameA?.[sortKey]?.toUpperCase() > nameB?.[sortKey]?.toUpperCase()) {
				return 1 * reverse;
			}
			return 0;
		} else {
			return direction === 'ascending' ? nameA?.[sortKey] - nameB?.[sortKey] : nameB?.[sortKey] - nameA?.[sortKey];
		}
	})
	return so;
}