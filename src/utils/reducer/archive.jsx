import { NOT_SET } from "../../constants/status";

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
					selectedArchive: NOT_SET,
					messages: state.length > 0 ? [...state[lastIndex].messages, action.nextMessages] : [action.nextMessages],
				},
			];
			}
		case 'SET_SELECTED_ARCHIVE': {
			const indexToUpdate = state[action.nextSelectedArchive]; //state.findIndex((item) => item.title === title);

			if (!indexToUpdate) {
				console.log('no index to update')
				return state;
			}

			const updatedItem = {
				...state[action.nextSelectedArchive],
				selectedArchive: action.nextSelectedArchive,
			};

			console.log('up: ', updatedItem)

			return [
				...state.slice(0, action.nextSelectedArchive), 
				updatedItem,
				...state.slice(action.nextSelectedArchive + 1),
			];
		}
	  	default: { return state };
	}
}