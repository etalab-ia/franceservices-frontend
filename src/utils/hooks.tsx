import { EventSourcePolyfill } from "event-source-polyfill"
import { setHeaders, setUserQuestion } from "./setData"
import { onCloseStream } from "./eventsEmitter"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, Question, RootState } from "../../types"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFetch = async (url: string, method: string, props): Promise<any> => {
	const { data, headers } = props
	try {
		const response = await fetch(url, {
			method: method,
			credentials: "include",
			headers,
			body: data === undefined ? "" : data,
		})

		if (!response.ok) {
			throw new Error(`Fetch failed with status: ${response.status}`)
		}

		if (url.includes("start")) return response
		else {
			const jsonData = await response.json()
			return jsonData
		}
	} catch (error) {
		console.error("An error occurred: ", error)
		throw error
	}
}

function handleStreamMessage(e, dispatch, stream_chat) {
	try {
		const jsonData = JSON.parse(e.data)
		if (jsonData == "[DONE]") {
			stream_chat.close()

			dispatch({ type: "SET_STREAM_ID", nextStreamId: 0 })
			dispatch({ type: "SET_CHAT_ID", nextChatId: 0 })
			return dispatch({ type: "STOP_AGENT_STREAM" })
		} else {
			return dispatch({ type: "GET_AGENT_STREAM", nextResponse: jsonData })
		}
	} catch (error) {
		console.error("An error occurred: ", error)

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
export const useStream = async (dispatch, id: number, streamUrl: string) => {
	const stream_chat = new EventSourcePolyfill(`${streamUrl}/${id}/start`, {
		headers: setHeaders(true),
		withCredentials: true,
	})

	dispatch({ type: "RESET_AGENT_STREAM" })
	stream_chat.onmessage = function (e) {
		handleStreamMessage(e, dispatch, stream_chat)
	}
	stream_chat.onerror = function (e) {
		handleStreamError(e, stream_chat)
	}
	onCloseStream(() => {
		if (stream_chat) {
			stream_chat.close()
		}
		dispatch({ type: "SET_INITIAL_STREAM" })
		dispatch({ type: "SET_CHAT_ID", nextChatId: 0 })
	})
}

/*
 **  Generates new stream from a chatId
 */
export async function generateStream(
	question: Question,
	dispatch,
	chatId: number,
	streamUrl: string
) {
	const headers = setHeaders(false)
	const stream_data = setUserQuestion(question)
	const stream = await useFetch(streamUrl + `/chat/${chatId}`, "POST", {
		data: JSON.stringify(stream_data),
		headers,
	})
	dispatch({ type: "SET_STREAM_ID", nextStreamId: stream.id })

	await useStream(dispatch, stream.id, streamUrl)
}
