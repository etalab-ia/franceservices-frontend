import { streamUrl } from '@api'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, Question, RootState } from '../types'
import { onCloseStream } from './eventsEmitter'
import { setHeaders, setUserQuestion } from './setData'

export const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFetch = async (url: string, method: string, props): Promise<any> => {
  const { data, headers } = props
  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      headers,
      body: data === undefined ? '' : data,
    })

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`)
    }

    if (url.includes('start')) return response
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('An error occurred: ', error)
    throw error
  }
}

function handleStreamMessage(e, dispatch, stream_chat, id: number) {
  try {
    const jsonData = JSON.parse(e.data)
    if (jsonData === '[DONE]') {
      stream_chat.close()
      dispatch({ type: 'SET_STREAM_ID', nextStreamId: 0 })
      return dispatch({ type: 'STOP_AGENT_STREAM' })
    }
    return dispatch({ type: 'GET_AGENT_STREAM', nextResponse: jsonData })
  } catch (error) {
    console.error('An error occurred: ', error)

    return error
  }
}

function handleStreamError(e, stream_chat) {
  if (stream_chat) {
    stream_chat.close()

    return stream_chat
  }
}

/*
 **	Manage stream
 */
const useStream = async (dispatch, id: number, isChat: boolean) => {
  const stream_chat = new EventSourcePolyfill(`${streamUrl}/${id}/start`, {
    headers: setHeaders(true),
    withCredentials: true,
  })

  dispatch({ type: 'RESET_AGENT_STREAM' })
  stream_chat.onmessage = (e) => {
    handleStreamMessage(e, dispatch, stream_chat, id)
  }
  stream_chat.onerror = (e) => {
    handleStreamError(e, stream_chat)
  }
  onCloseStream(() => {
    if (stream_chat) {
      stream_chat.close()
    }
    dispatch({ type: 'SET_INITIAL_STREAM' })
  })
}

/*
 **  Generates new stream from a chatId
 */
export async function generateStream(
  question: Question,
  dispatch,
  chatId: number,
  isChat: boolean
) {
  const headers = setHeaders(false)
  const stream_data = setUserQuestion(question)
  const stream = await useFetch(streamUrl + `/chat/${chatId}`, 'POST', {
    data: JSON.stringify(stream_data),
    headers,
  })
  dispatch({ type: 'SET_STREAM_ID', nextStreamId: stream.id })
  dispatch({ type: 'SET_LAST_STREAM_ID', nextLastStreamId: stream.id })

  await useStream(dispatch, stream.id, isChat)
}
