export const	historyReducer = (state = { messages: [] }, action) => {
	switch (action.type) {
		case 'SET_MESSAGES': 
			return {
				...state,
				messages: [...state.messages, action.nextMessage]
			}
	  	default: { return state };
	}
}