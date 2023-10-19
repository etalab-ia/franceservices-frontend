import { initialQuestion } from "./state"

export const	userReducer = (state = { question: initialQuestion, sheets: [] }, action) => {
	switch (action.type) {
		case 'SET_USER_TITLE':
			return {
				...state,
				question: {
					...state.question,
					title: action.nextTitle
				}
			}
		case 'SET_USER_INSTITUTION':
			return {
				...state,
				question: {
					...state.question,
					institution: action.nextInstitution
				}
			}
		case 'SET_USER_TEXT':
			return {
				...state,
				question: {
					...state.question,
					user_text: action.nextUserText
				}
			}
		case 'SET_SHEETS':
			return {
				...state,
				sheets: action.nextSheets,
			}
		case 'RESET_QUESTION_FIELDS':
			return {
				...state,
				question: initialQuestion
			}
	  	default: { return state };
	}
}