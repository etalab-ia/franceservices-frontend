import { initialStream } from "./state"

export const	streamReducer = (state = initialStream, action) => {
	switch (action.type) {
		case 'GET_AGENT_STREAM':
			return {
				...state,
				response: [...state.response, action.nextResponse]
			}
		case 'STOP_AGENT_STREAM':
			return {
				...state,
				isStoppable: false
			}
		case 'REDO_AGENT_STREAM':
			return {
				...state,
				response: [],
				isStoppable: true
			}
		case 'RESET_AGENT_STREAM':
			return {
				...state,
				response: []
			}
	  	default: { return state };
	}
}