export const	feedbackReducer = (state = { reasons: [] }, action) => {
	switch (action.type) {
		case "SET_NEW_FEEDBACK":
	  		return {
                ...state, 
                reasons: [...state.reasons, action.nextFeedback]
            };
		case "RESET_FEEDBACK":
	  		return { reasons: [] };
	  	default: { return state };
	}
}