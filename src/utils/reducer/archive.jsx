import { initialArchive } from "./state";

export const	archiveReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_ARCHIVE': {
			console.log('new state, old: ', state)
			return [...state, {
				title: `Archive n°${state.length}`,
				date: action.nextDate,
				themes: action.nextThemes,
				source: action.nextSource,
			}]
		}
		case 'SET_SOURCE': {
			console.log('set source')
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
				title: `Archive n°${state.length}`
			}
	  	default: { return state };
	}
}