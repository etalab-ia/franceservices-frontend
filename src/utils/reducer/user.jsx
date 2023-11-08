import { initialQuestion, initialUserChoices } from "./state"

export const	userReducer = (state = { question: initialQuestion, choices: initialUserChoices, sheets: [], messages: [] }, action) => {
	switch (action.type) {
		case 'SET_USER_MODEL_NAME_CHOICE':
			return {
				...state,
				question: {
					...state.question,
					model_name: action.nextModelName,
					limit: action.nextLimit,
					mode: action.nextMode,
				}
			}
		case 'SET_USER_TEXT':
			return {
				...state,
				question: {
					...state.question,
					user_text: action.nextUserText,
					query: action.nextUserText
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
		case 'SET_MESSAGES': 
			return {
				...state,
				messages: [...state.messages, action.nextMessage]
			}
	  	default: { return state };
	}
}