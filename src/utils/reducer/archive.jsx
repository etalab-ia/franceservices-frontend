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
					additionalSheets: action.nextAdditionalSheets,
					webservices: action.nextWebservices,
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
			
			const	lastIndex = state.length ? state.length - 1 : state.length;
			const	nextSheets = state[lastIndex].sheets.filter((sheet, index) => action.indexToRemove !== index);
			const	nextAdditionalSheets = state[lastIndex].sheets.filter((sheet, index) => action.indexToRemove === index);

			return [
				...state.slice(0, lastIndex),
				{
					...state[lastIndex],
					sheets: nextSheets,
					additionalSheets: [...state[lastIndex].additionalSheets, ...nextAdditionalSheets],
				},
		  ];
		}
		case 'ADD_SHEETS': {
			if (!state.length)
				return state;

			const	lastIndex = state.length ? state.length - 1 : state.length;
			const	nextSheets = state[lastIndex].additionalSheets.filter((sheet, index) => action.indexToAdd === index);
			const	nextAdditionalSheets = state[lastIndex].additionalSheets.filter((sheet, index) => action.indexToAdd !== index);

			return [
				...state.slice(0, lastIndex),
				{
					...state[lastIndex],
					sheets: [...state[lastIndex].sheets, ...nextSheets],
					additionalSheets: nextAdditionalSheets,
				},
		  ];
		}
	  	default: { return state };
	}
}