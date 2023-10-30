import { ressourceButtons } from "../../constants/ressources";
import { NOT_SET } from "../../constants/status";

export const	archiveReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_ARCHIVE': {
			if (state.length === 0)
				return state;
	  
			const	lastIndex = state.length - 1;
			const	source = action.nextSource === ressourceButtons[0].model_name ? ressourceButtons[0].name : ressourceButtons[1].name;
	  
			return [
			  	...state.slice(0, lastIndex),
			  	{
					...state[lastIndex],
					date: action.nextDate,
					themes: action.nextThemes,
					source: source,
					selectedArchive: NOT_SET,
					messages: state[lastIndex].messages
					? [...state[lastIndex].messages, action.nextMessages]
					: [action.nextMessages],
			 	},
			];
		}
		case 'SET_ARCHIVE_TITLE': {
			return [
				...state,
				{ title: action.nextTitle, }
			]
		}
	  	default: { return state };
	}
}