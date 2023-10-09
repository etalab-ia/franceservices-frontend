export const	institutionsReducer = (state = { institutions: [] }, action) => {
	switch (action.type) {
		case 'SET_INSTITUTIONS':
			return {
				...state,
				institutions: action.nextInstitutions
			}
	  	default: { return state };
	}
}