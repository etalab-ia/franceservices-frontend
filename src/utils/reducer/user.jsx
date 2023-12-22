import { initialChatbotMessage } from "../../constants/chatbotProps"
import { initialQuestion, initialUser, initialUserChoices } from "./state"

export const	userReducer = (state = initialUser, action) => {
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
				sheets: action.sheets.slice(0, 3),
				additionalSheets: action.sheets.slice(3, 10),
				webservices: action.sheets[0].web_services.slice(0, 3),
			}
		case 'SET_CHUNKS':
			return {
				...state,
				chunks: action.chunks,
			}
		case 'SET_SHEETS_FROM_ARCHIVE':
			return {
				...state,
				sheets: action.nextSheets,
				additionalSheets: action.nextAdditionalSheets,
				webservices: action.nextWebservices,
			}
		case 'REMOVE_SHEETS': {
			if (!state.sheets)
				return state;

			const	nextSheets = state.sheets.filter((sheet, index) => action.indexToRemove !== index);
			const	nextAdditionalSheets = state.sheets.filter((sheet, index) => action.indexToRemove === index);
			const	nextMustNotSids = [...state.question.must_not_sids, nextAdditionalSheets[0].sid];
			const	nextShouldSids = state.question.should_sids.length ? state.question.should_sids.filter((sid) => !nextAdditionalSheets.includes(sid)) : state.sheets.map((sheet) => sheet.sid);

			return {
				...state,
				sheets: nextSheets,
				additionalSheets: [...state.additionalSheets, ...nextAdditionalSheets],
				question: {
					...state.question,
					should_sids: nextShouldSids,
					must_not_sids: nextMustNotSids,
				}
			}
		}
		case 'ADD_SHEETS': {
			if (!state.sheets)
				return state;

			const	nextSheets = state.additionalSheets.filter((sheet, index) => action.indexToAdd === index);
			const	nextAdditionalSheets = state.additionalSheets.filter((sheet, index) => action.indexToAdd !== index);
			const	nextShouldSids = state.question.should_sids.length ? [...state.question.should_sids, nextSheets[0].sid] : [...state.sheets.map((sheet) => sheet.sid), nextSheets[0].sid];
			const	nextMustNotSids = state.question.must_not_sids.filter((sid) => !nextShouldSids.includes(sid));
			
			return {
				...state,
				sheets: [...state.sheets, ...nextSheets],
				additionalSheets: nextAdditionalSheets,
				question: {
					...state.question,
					should_sids: nextShouldSids,
					must_not_sids: nextMustNotSids,
				}
			}
		}
		case 'RESET_SIDS_CHOICES': {
			return {
				...state,
				question: {
					...state.question,
					should_sids: [],
					must_not_sids: []
				}
			}
		}
		case 'SET_USER_QUERY':
			return {
				...state,
				originQuestion: action.nextUserQuery,
				question: {
					...state.question,
					query: action.nextUserQuery
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