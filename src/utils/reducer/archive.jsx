export const	archiveReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_ARCHIVE': {
			const	lastIndex = state.length ? state.length - 1 : state.length;
	  
			return [
			  	...state,
			  	{
					...state[lastIndex],
					date: action.nextDate,
					tags: action.nextTags,
					messages: action.nextMessages,
					type: action.nextType,
					sheets: action.nextSheets,
					limit: 7,
					source: 'service-public.fr'
			 	},
			];
		}
		case 'SET_ARCHIVE_LIMIT': {
			const	lastIndex = state.length ? state.length - 1 : state.length;

			return [
				...state.slice(0, lastIndex),
				{
					...state[lastIndex],
					limit: action.nextLimit,
				},
		  ];
		}
		case 'REMOVE_SHEETS': {
			if (!state.length)
				return state;

			const	lastIndex = state.length - 1;
			const	nextSheets = state[lastIndex].sheets.filter((sheet, index) => !action.indexToRemove.includes(index));

			return [
				...state.slice(0, lastIndex),
				{
					...state[lastIndex],
					sheets: nextSheets,
				},
		  ];
		}
	  	default: { return state };
	}
}