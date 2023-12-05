import { initialStream } from "./state"

export const	streamReducer = (state = initialStream, action) => {
	switch (action.type) {
		case 'SET_INITIAL_CHAT':
			return initialStream;
		case 'SET_INITIAL_STREAM':
			return initialStream;
		case 'GET_AGENT_STREAM':
			return {
				...state,
				isStreaming: true,
				response: [...state.response, action.nextResponse]
			}
		case 'STOP_AGENT_STREAM':
			const joinedRes = state.response.join('');

			return {
				...state,
				historyStream: [...state.historyStream, joinedRes],
				isStreaming: false,
				response: [],
			}
		case 'RESET_AGENT_STREAM':
			return {
				...state,
				response: [],
			}
		case 'SET_STREAM_HISTORY':
			return {
				...state,
				historyStream: [...state.historyStream, action.nextStream],
				activeTab: 1,
			}
		case 'RESET_STREAM_HISTORY':
			return {
				...state,
				historyStream: [],
				activeTab: 1,
			}
		case 'SWITCH_TAB':
			return {
				...state,
				activeTab: action.nextTab
			}
	  	default: { return state };
	}
}