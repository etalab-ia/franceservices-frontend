export const	ressourcesReducer = (state = { choices: [] }, action) => {
	switch (action.type) {
		case "SET_NEW_RESSOURCE":
	  		return {
				...state, 
				choices: [...state.choices, action.nextChoice]
			};
		case "RM_RESSOURCE":
	  		return {
				choices: state.choices.filter(reason => reason !== action.rmChoice)
			};
		case "RESET_RESSOURCE":
	  		return { choices: [] };
	  	default: { return state };
	}
}