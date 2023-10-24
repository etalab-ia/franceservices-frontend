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
					messages: state.length > 0 ? [...state[lastIndex].messages, action.nextMessages] : [action.nextMessages],
				},
			];
			}
		case 'SET_SELECTED_ARCHIVE': {
			console.log('set selected')
			const { title } = action;
			const indexToUpdate = state.findIndex((item) => item.title === title);

			if (indexToUpdate === -1) {
				return state;
			}

			const updatedItem = {
				...state[indexToUpdate],
				selectedArchive: action.nextSelectedArchive,
			};
			console.log('here selectedArchive: ', selectedArchive)

			return [
				...state.slice(0, indexToUpdate), 
				updatedItem,
				...state.slice(indexToUpdate + 1),
			];
		}
	  	default: { return state };
	}
}