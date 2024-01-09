import { chatUrl } from "../constants/api"
import { generateStream, useFetch } from "./hooks"
import { setHeaders } from "./setData"

export function postNewQuestion(dispatch, question, isNewQuestion, chatId) {
	generateStream(question, dispatch, chatId)
	dispatch({ type: "RESET_FEEDBACK" })
	isNewQuestion !== 0 && dispatch({ type: "RESET_QUESTION_FIELDS" })
}

export async function setNewQuestion(dispatch, newQuestion, agentResponse) {
	const headers = setHeaders(false)
	const chat_data = { chat_type: "meeting" }
	const chat = await useFetch(chatUrl, "POST", { data: JSON.stringify(chat_data), headers })
	dispatch({ type: "SET_USER_QUERY", nextUserQuery: newQuestion, nextChatId: chat.id })
	agentResponse.length &&
		dispatch({ type: "SET_MESSAGES", nextMessage: { text: agentResponse, sender: "agent" } })
	dispatch({ type: "RESET_STREAM_HISTORY" })
	dispatch({ type: "RESET_USER_CHOICES" })
	dispatch({ type: "SET_MESSAGES", nextMessage: { text: newQuestion, sender: "user" } })
}
