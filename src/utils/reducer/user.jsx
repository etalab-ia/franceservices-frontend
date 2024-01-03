import { initialChatbotMessage } from "../../constants/chatbotProps"
import { initialQuestion, initialUser, initialUserChoices } from "./state"

/*****************************************************************************************************
	
	VARIABLES:

	**	question: user params used to POST on /stream
	**	messages: full conversation between user & agent with { sender: 'sender', text: 'message' }
	**	sheets: main sheets related to user question and display, GET on /indexes sheets
	**	additionalSheets: additional sheets display on Modify mode and suggest to user, GET on /indexes sheets
	**	webservices: related to question. Choice of webservices could be improve, GET on /indexes sheets 
			first index
	**	chunks: chunks used to generate response, GET on /indexes chunks
	**	should_sids: sheets id suggest to agent to generate response
	**	must_not_sids: sheets id forbidden to be used by agent to generate response

 *****************************************************************************************************/

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

			if (JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids))
				return {
					...state,
					sheets: [...state.sheets, ...nextSheets],
					additionalSheets: nextAdditionalSheets,
				}

			return {
				...state,
				sheets: nextSheets,
				additionalSheets: [...state.additionalSheets, ...nextAdditionalSheets],
				question: {
					...state.question,
					must_not_sids: nextMustNotSids,
				}
			}
		}
		case 'ADD_SHEETS': {
			if (!state.sheets)
				return state;

			const	nextSheets = state.additionalSheets.filter((sheet, index) => action.indexToAdd === index);
			const	nextAdditionalSheets = state.additionalSheets.filter((sheet, index) => action.indexToAdd !== index);
			const	nextShouldSids = [...state.sheets.map((sheet) => sheet.sid), nextSheets[0].sid];
			const	nextMustNotSids = state.question.must_not_sids.filter((sid) => !nextShouldSids.includes(sid));

			if (JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids))
				return {
					...state,
					sheets: [...state.sheets, ...nextSheets],
					additionalSheets: nextAdditionalSheets,
				}

			return {
				...state,
				sheets: [...state.sheets, ...nextSheets],
				additionalSheets: nextAdditionalSheets,
				question: {
					...state.question,
					must_not_sids: nextMustNotSids,
				}
			}
		}
		case 'RESET_SIDS_CHOICES': {
			return {
				...state,
				question: {
					...state.question,
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