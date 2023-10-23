import { initialQuestion, initialUserChoices } from "./state"

export const	userReducer = (state = { question: initialQuestion, choices: initialUserChoices, sheets: [] }, action) => {
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
		case 'SET_INPUT_VISIBILITY':
			return {
				...state,
				inputVisibility: action.nextVisibility,
			}
		case 'RESET_QUESTION_FIELDS':
			return {
				...state,
				question: initialQuestion
			}
		case 'RESET_USER_CHOICES':
			return {
				...state,
				choices: initialUserChoices,
				sheets: [],
			}
		case 'SET_USER_CHOICES':
			return {
				...state,
				choices: {
					...state.choices,
					[action.nextKey]: action.nextValue,
				}
			}
	  	default: { return state };
	}
}