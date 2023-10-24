export const	archiveReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_ARCHIVE': {
			const	lastIndex = state.length > 0 ? state.length - 1 : state.length;

			return [
				...state,
				{
					// TODO: set user_text as title ?
					title: `Archive n°${state.length + 1}`,
					date: action.nextDate,
					themes: action.nextThemes,
					source: action.nextSource,
					messages: state.length > 0 ? [...state[lastIndex].messages, action.nextMessages] : [action.nextMessages],
				},
			];
			}
		case 'SET_SOURCE': {
			const	lastIndex = state.length - 1;
			const	newState = state.map((item, i) => {
				if (i === lastIndex) {
					return { ...item, source: action.newSource };
			  	}
				return item;
			});
			return newState;
		}
		case 'SET_DATE': 
			return {
				...state,
				date: action.nextDate,
			}
		case 'SET_TITLE': 
			return {
				...state,
				title: `Archive n°${state.length + 1}`
			}
	  	default: { return state };
	}
}