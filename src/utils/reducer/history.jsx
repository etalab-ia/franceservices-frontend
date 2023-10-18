export const	historyReducer = (state = { messages: [], activeTab: 1 }, action) => {
	switch (action.type) {
		case 'SET_MESSAGES': 
			return {
				...state,
				messages: [...state.messages, action.nextMessage]
			}
		case 'RESET_MESSAGES': 
			return {
				messages: [],
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