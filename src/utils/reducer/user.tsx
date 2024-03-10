import {
  UserHistory,
  type Message,
  type Question,
  type User,
  Sheet,
  Chunk,
  WebService,
} from '@types'
import { initialChatbotMessage } from '../../constants/chatbotProps'

/*****************************************************************************************************
	
	VARIABLES:

	**	question: user params used to POST on /stream
	**	messages: full conversation between user & agent with { sender: 'sender', text: 'message' }
	**	sheets: main sheets related to user question and display, GET on /indexes sheets
	**	additionalSheets: additional sheets display on Modify mode and suggest to user, GET on /indexes sheets
	**	webservices: related to question. Choice of webservices could be improve, GET on /indexes sheets 
			first index
	**	chunks: chunks used to generate response, GET on /indexes chunks
	**	should_sids: sheets id suggest to agent to generate response: 
			! Temporary removed: should is treated as a must in backend

	**	must_not_sids: sheets id forbidden to be used by agent to generate response

 *****************************************************************************************************/

// TODO:
// - question: local state
// - messages: check w/ backend /streams

const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string

const InitialQuestion: Question = {
  model_name: modelName,
  mode: modelMode,
  query: '',
  limit: 7,
  context: undefined,
  institution: undefined, //TODO: remove
  links: undefined,
  temperature: 20,
  sources: ['service-public', 'travail-emploi'],
  should_sids: [],
  must_not_sids: [],
}

const InitialUser: User = {
  question: InitialQuestion,
  messages: [{ text: initialChatbotMessage, sender: 'agent' }],
  sheets: [],
  additionalSheets: [],
  chunks: [],
  webservices: [],
  chatId: 0,
  streamId: 0,
  lastStreamId: 0,
  history: [],
}

type UserAction =
  | { type: 'SET_SHEETS'; sheets: Sheet[] }
  | { type: 'SET_CHUNKS'; chunks: Chunk[] }
  | {
      type: 'SET_SHEETS_FROM_ARCHIVE'
      sheets: Sheet[]
      additionalSheets: Sheet[]
      webservices: WebService[]
    }
  | { type: 'REMOVE_SHEETS'; indexToRemove: number }
  | { type: 'ADD_SHEETS'; indexToAdd: number }
  | { type: 'SET_USER_QUERY'; nextUserQuery: string; nextChatId: number }
  | { type: 'RESET_QUESTION_FIELDS' }
  | { type: 'RESET_USER' }
  | { type: 'SET_MESSAGES'; nextMessage: Message }
  | { type: 'SET_STREAM_ID'; nextStreamId: number }
  | { type: 'SET_CHAT_ID'; nextChatId: number }
  | { type: 'ADD_HISTORY'; newItem: UserHistory }
  | { type: 'SET_LAST_STREAM_ID'; nextLastStreamId: number }

export const userReducer = (state: User = InitialUser, action: UserAction): User => {
  switch (action.type) {
    case 'SET_LAST_STREAM_ID':
      return {
        ...state,
        lastStreamId: action.nextLastStreamId,
      }
    case 'ADD_HISTORY':
      return {
        ...state,
        history: [...state.history, action.newItem],
      }
    case 'SET_SHEETS':
      return {
        ...state,
        sheets: action.sheets.slice(0, 3),
        additionalSheets: action.sheets.slice(3, 10),
        webservices: action.sheets[0].web_services?.slice(0, 3),
      }
    case 'SET_CHUNKS':
      return {
        ...state,
        chunks: action.chunks,
      }
    case 'SET_SHEETS_FROM_ARCHIVE':
      return {
        ...state,
        sheets: action.sheets,
        additionalSheets: action.additionalSheets,
        webservices: action.webservices,
      }
    case 'REMOVE_SHEETS': {
      if (!state.sheets) return state

      const sheets = state.sheets.filter((_, index) => action.indexToRemove !== index)
      const additionalSheets = state.sheets.filter(
        (_, index) => action.indexToRemove === index
      )
      const nextMustNotSids = [...state.question.must_not_sids, additionalSheets[0].sid]

      if (
        JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids)
      )
        return {
          ...state,
          sheets: [...state.sheets, ...sheets],
          additionalSheets: additionalSheets,
        }

      return {
        ...state,
        sheets: sheets,
        additionalSheets: [...state.additionalSheets, ...additionalSheets],
        question: {
          ...state.question,
          must_not_sids: nextMustNotSids,
        },
      }
    }
    case 'ADD_SHEETS': {
      if (!state.sheets) return state

      const sheets = state.additionalSheets.filter(
        (_, index) => action.indexToAdd === index
      )
      const additionalSheets = state.additionalSheets.filter(
        (_, index) => action.indexToAdd !== index
      )
      const nextShouldSids = [...state.sheets.map((sheet) => sheet.sid), sheets[0].sid]
      const nextMustNotSids = state.question.must_not_sids.filter(
        (sid) => !nextShouldSids.includes(sid)
      )

      if (
        JSON.stringify(nextMustNotSids) === JSON.stringify(state.question.must_not_sids)
      )
        return {
          ...state,
          sheets: [...state.sheets, ...sheets],
          additionalSheets: additionalSheets,
        }

      return {
        ...state,
        sheets: [...state.sheets, ...sheets],
        additionalSheets: additionalSheets,
        question: {
          ...state.question,
          must_not_sids: nextMustNotSids,
        },
      }
    }
    case 'SET_CHAT_ID':
      return {
        ...state,
        chatId: action.nextChatId,
      }
    case 'SET_USER_QUERY':
      return {
        ...state,
        question: {
          ...state.question,
          query: action.nextUserQuery,
        },
        chatId: action.nextChatId,
      }
    case 'RESET_QUESTION_FIELDS':
      return {
        ...state,
        question: InitialQuestion,
      }
    case 'RESET_USER':
      return InitialUser
    case 'SET_MESSAGES':
      if (state.messages.length > 0) {
        const lastMessage = state.messages[state.messages.length - 1]

        if (lastMessage.sender === action.nextMessage.sender) {
          const updatedMessages = state.messages.slice(0, -1) // remove last message
          const updatedLastMessage = {
            ...lastMessage,
            text: lastMessage.text.concat(action.nextMessage.text),
          } // update last message
          updatedMessages.push(updatedLastMessage)
          // action.nextMessage.text
          return {
            ...state,
            messages: updatedMessages,
          }
        }
      }
      return {
        ...state,
        messages: [...state.messages, action.nextMessage],
      }
    case 'SET_STREAM_ID':
      return {
        ...state,
        streamId: action.nextStreamId,
      }
    default: {
      return state
    }
  }
}
