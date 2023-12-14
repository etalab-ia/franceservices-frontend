import { initialChatbotMessage } from "../../constants/chatbotProps"
import { initialQuestion, initialUserChoices } from "./state"

export const	userReducer = (state = { question: initialQuestion, choices: initialUserChoices, messages: [], sheets: [] }, action) => {
	switch (action.type) {
		case 'SET_INITIAL_CHAT': 
			return {
				question: initialQuestion,
				choices: initialUserChoices,
				messages: [{ text: initialChatbotMessage, sender: 'agent' }],
			}
		case 'SET_SHEETS':
			return {
				...state,
				sheets: action.nextSheets,
			}
		case 'REMOVE_SHEETS':
			if (!state.sheets)
				return state;
			
			const	nextSheets = state.sheets.filter((sheet, index) => !action.indexToRemove.includes(index));

			return {
				...state,
				sheets: nextSheets,
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