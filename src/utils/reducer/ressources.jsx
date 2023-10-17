export const	ressourcesReducer = (state = { choices: [], isConfirmed: false }, action) => {
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
		case "CONFIRM_RESSOURCE":
	  		return {
				...state,
				isConfirmed: true
			};
		case "RESET_RESSOURCE":
	  		return {
				choices: [],
				isConfirmed: false,
			};
	  	default: { return state };
	}
}