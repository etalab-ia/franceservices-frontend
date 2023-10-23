import { NOT_SET } from "../../constants/status";

export const	ressourcesReducer = (state = { choices: [], isConfirmed: NOT_SET }, action) => {
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
				isConfirmed: NOT_SET,
			};
	  	default: { return state };
	}
}