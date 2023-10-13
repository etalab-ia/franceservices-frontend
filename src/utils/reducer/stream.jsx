import { initialStream } from "./state"

export const	streamReducer = (state = initialStream, action) => {
	switch (action.type) {
		case 'GET_AGENT_STREAM':
			return {
				...state,
				isStreaming: true,
				response: [...state.response, action.nextResponse]
			}
		case 'STOP_AGENT_STREAM':
			const joinedRes = state.response.slice(1).join('');

			return {
				...state,
				historyStream: [...state.historyStream, joinedRes],
				isStoppable: false,
				isStreaming: false,				
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