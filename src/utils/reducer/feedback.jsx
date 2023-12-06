export const	feedbackReducer = (state = { reasons: [], isConfirmed: false }, action) => {
	switch (action.type) {
		case "SET_NEW_FEEDBACK":
			return {
				...state, 
				reasons: [...state.reasons, action.nextFeedback]
			};
		case "RM_FEEDBACK":
			return {
				reasons: state.reasons.filter(reason => reason !== action.rmFeedback)
			};
		case "CONFIRM_FEEDBACKS":
			return {
				...state,
				isConfirmed: true,
			}
		case "SET_ARCHIVE_LIMIT":
			return {
				reasons: [],
				isConfirmed: false,
			};
		case "RESET_FEEDBACK":
			return {
				reasons: [],
				isConfirmed: false,
			};
		default: { return state };
	}
}