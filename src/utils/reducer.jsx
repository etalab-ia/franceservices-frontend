import { initialState } from "../constants/state";

export const reducer = (state, action) => {
	switch (action.type) {
		case "LOGOUT":
	  		return initialState;
		case "LOGIN":
	  		return { ...state, isLogin: true, userToken: action.nextUserToken };
		case "SET_USER":
	  		return { ...state, username: action.nextUsername, email: action.nextEmail };
		case "SET_USERNAME":
			return { ...state, username: action.nextUsername };
		case "SET_EMAIL":
	  		return { ...state, email: action.nextEmail };
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.nextActiveTab
			}
		case 'SET_MESSAGES': 
			return {
				...state,
				messages: [...state.messages, action.nextMessage]
			};
		case 'SET_INSTITUTIONS':
			return {
				...state,
				institutions: action.nextInstitutions,
			}
		case 'SET_USER_TEXT':
			return {
				...state,
				question: {
					...state.question,
					user_text: action.nextUserText,
				},
				// isDisable: action.nextUserText.length === 0 &&
				// 	(state.question.institution || 
				// 	state.institutions.includes(state.question.institution)),
			}
		case 'INSTITUTION_NOT_FOUND':
			return {
				...state,
				// isDisable: true
			}
		case 'INSTITUTION_FOUND':
			return {
				...state,
				// isDisable: false
			}
		case 'RESET_QUESTION_FIELDS':
			return {
				...state,
				question: initialQuestion,
			}
		case 'IMPORT': {
			return {
				...state,
				import: [...state.import, action.nextExperience],
				question: initialQuestion,
			} 
		}
		case 'RESET_IMPORT': {
			return {
				...state,
				import: []
			} 
		}
		case 'ADD_USER_NEW_FIELD':

			const	{ nextUserField } = action;
			const	updatedFields = state.availableFields.map((field) => {

				if (field.value === nextUserField.value) {
					return {
						...field,
						isChecked: nextUserField.isChecked,
					};
			  	}

			  return field;
			});
				
			return {
				...state,
				availableFields: updatedFields,
			};
		case 'SET_USER_TITLE':
			return {
				...state,
				question: {
					...state.question,
					title: action.nextTitle,
				},
			}
		case 'SET_USER_INSTITUTION':
			return {
				...state,
				question: {
					...state.question,
					institution: action.nextInstitution,
				},
				isDisable: state.question.user_text.length === 0,
			}
		case 'START_GENERATION':
			return {
				...state,
				generate: true,
			}
		case 'SUBMIT_USER_QUESTION':
			return {
				...state,
				sheets: action.nextSheets,
				experiences: action.nextExperiences,
				userEdition: false,
				isStoppable: true,
			}
		case 'RESET_USER_QUESTION':
			return {
				...state,
				sheets: [],
				experiences: [],
				userEdition: true,
			}
		
		case 'GET_AGENT_STREAM':
			return {
				...state,
				response: [...state.response, action.nextResponse],
			}
		case 'EDIT_AGENT_STREAM':
			return {
				...state,
				response: [action.nextResponse],
			}
		case 'RESET_AGENT_STREAM':
			return {
				...state,
				response: [],
			}
		case 'SET_EDITABLE_AGENT_STREAM':
			return {
				...state,
				isEditable: true,
			}
		case 'REDO_AGENT_STREAM':
			return {
				...state,
				response: [],
				isEditable: false,
				isStoppable: true,
			}
		case 'STOP_AGENT_STREAM':
			return {
				...state,
				isStoppable: false,
			}
	  	default: {
			return state
	  	}	
	}
}