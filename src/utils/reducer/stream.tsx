import type { Stream } from '@types'

const initialStream = {
  response: '',
  historyStream: [],
  isStreaming: false,
  activeTab: 1,
}

export const streamReducer = (state: Stream = initialStream, action: StreamAction) => {
  switch (action.type) {
    case 'RESET_USER':
      return initialStream
    case 'SET_INITIAL_STREAM':
      return initialStream
    case 'GET_AGENT_STREAM':
      return {
        ...state,
        isStreaming: true,
        response: state.response.concat(action.nextResponse),
      }
    case 'STOP_AGENT_STREAM':
      return {
        ...state,
        historyStream: [...state.historyStream, state.response],
        isStreaming: false,
        response: '',
      }
    case 'SET_ARCHIVE_LIMIT':
      return {
        ...state,
        response: '',
      }
    case 'RESET_AGENT_STREAM':
      return {
        ...state,
        response: '',
      }
    case 'SET_STREAM_HISTORY':
      return {
        ...state,
        historyStream: [...state.historyStream, action.nextStream],
        activeTab: 1,
      }
    case 'RESET_STREAM_HISTORY':
      return {
        ...state,
        historyStream: [],
        activeTab: 1,
      }
    case 'SWITCH_TAB':
      return {
        ...state,
        activeTab: action.nextTab,
      }
    case 'SET_IS_STREAMING':
      return {
        ...state,
        isStreaming: action.nextIsStreaming,
      }
    default: {
      return state
    }
  }
}

type StreamAction =
  | { type: 'RESET_USER' }
  | { type: 'SET_INITIAL_STREAM' }
  | { type: 'GET_AGENT_STREAM'; nextResponse: string }
  | { type: 'STOP_AGENT_STREAM' }
  | { type: 'SET_ARCHIVE_LIMIT' }
  | { type: 'RESET_AGENT_STREAM' }
  | { type: 'SET_STREAM_HISTORY'; nextStream: string }
  | { type: 'RESET_STREAM_HISTORY' }
  | { type: 'SWITCH_TAB'; nextTab: number }
  | { type: 'SET_IS_STREAMING'; nextIsStreaming: boolean }
