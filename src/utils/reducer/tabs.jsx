export const	tabsReducer = (state = { activeTab: 0 }, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.nextActiveTab
			}
	  	default: { return state };
	}
}