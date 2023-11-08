import { NOT_SET } from "../../constants/status";

export const	ressourcesReducer = (state = { isConfirmed: NOT_SET }, action) => {
	switch (action.type) {
		case "CONFIRM_RESSOURCE":
	  		return {
				...state,
				isConfirmed: true
			};
		case "RESET_RESSOURCE":
	  		return {
				choices: '',
				isConfirmed: NOT_SET,
			};
	  	default: { return state };
	}
}