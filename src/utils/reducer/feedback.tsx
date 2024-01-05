interface FeedbackState {
	reasons: string[]
	isConfirmed: boolean
}

type FeedbackAction =
	| { type: "SET_NEW_FEEDBACK"; nextFeedback: string }
	| { type: "RM_FEEDBACK"; rmFeedback: string }
	| { type: "CONFIRM_FEEDBACKS" }
	| { type: "SET_ARCHIVE_LIMIT" }
	| { type: "RESET_FEEDBACK" }

export const feedbackReducer = (
	state: FeedbackState = { reasons: [], isConfirmed: false },
	action: FeedbackAction
): FeedbackState => {
	switch (action.type) {
		case "SET_NEW_FEEDBACK":
			return {
				...state,
				reasons: [...state.reasons, action.nextFeedback],
			}
		case "RM_FEEDBACK":
			return {
				...state,
				reasons: state.reasons.filter((reason) => reason !== action.rmFeedback),
			}
		case "CONFIRM_FEEDBACKS":
			return {
				...state,
				isConfirmed: true,
			}
		case "SET_ARCHIVE_LIMIT":
		case "RESET_FEEDBACK":
			return {
				reasons: [],
				isConfirmed: false,
			}
		default: {
			return state
		}
	}
}
