import { initialQuestion, initialUserChoices } from "./state"

export const	userReducer = (state = { question: initialQuestion, choices: initialUserChoices, sheets: [], messages: [], isChat: false }, action) => {
	switch (action.type) {
		case 'SET_INITIAL_USER': 
			return {
				question: initialQuestion,
				choices: initialUserChoices,
				sheets: [],
				messages: [],
				isChat: false,
			}
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
				originQuestion: action.nextUserText,
				question: {
					...state.question,
					user_text: action.nextUserText,
					query: action.nextUserText
				},
				isChat: action.nextIsChat,
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
				if (state.messages.length > 0) 
				{
					const	lastMessage = state.messages[state.messages.length - 1];
			
					if (lastMessage.sender === action.nextMessage.sender) {
						const	updatedMessages = state.messages.slice(0, -1);
						const	updatedLastMessage = {
							...lastMessage,
							text: [...lastMessage.text, action.nextMessage.text],
						};
						updatedMessages.push(updatedLastMessage);
			
						return {
							...state,
							messages: updatedMessages,
						};
					}
				}
				return {
					...state,
					messages: [...state.messages, action.nextMessage],
				};
			
	  	default: { return state };
	}
}