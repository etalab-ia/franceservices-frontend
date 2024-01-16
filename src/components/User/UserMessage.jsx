import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { generateStream, useFetch } from "../../utils/hooks"
import { setHeaders } from "../../utils/setData"
import { useApiUrls } from "../../constants/api"

/*
 **
 */
export function UserMessage() {
	const stream = useSelector((state) => state.stream)
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const [currQuestion, setCurrQuestion] = useState("")
	const { streamUrl, chatUrl } = useApiUrls()

	const handleChange = (e) => {
		e.preventDefault()

		setCurrQuestion(e.target.value)
	}

	const handleClick = async () => {
		const headers = setHeaders(false)
		const chat_data = { chat_type: "meeting" }
		const chat = await useFetch(chatUrl, "POST", { data: JSON.stringify(chat_data), headers })

		dispatch({ type: "SET_USER_QUERY", nextUserQuery: currQuestion, nextChatId: chat.id })
		stream.historyStream.length &&
			dispatch({
				type: "SET_MESSAGES",
				nextMessage: { text: stream.historyStream, sender: "agent" },
			})
		dispatch({ type: "RESET_STREAM_HISTORY" })
		dispatch({ type: "SET_MESSAGES", nextMessage: { text: currQuestion, sender: "user" } })
	}

	useEffect(() => {
		if (!user.question.query.length || !user.chatId) return

		generateStream(user.question, dispatch, user.chatId, streamUrl)
		dispatch({ type: "RESET_FEEDBACK" })
	}, [user.question])

	const handleRenderInput = (params) => {
		const newParams = { maxLength: 800 }
		const updatedParams = { ...params, ...newParams }

		return <input {...updatedParams} />
	}

	return (
		<div className="flex justify-center">
			<SearchBar
				label="Poser votre question"
				className="w-5/6"
				onButtonClick={handleClick}
				onChange={handleChange}
				renderInput={handleRenderInput}
			/>
		</div>
	)
}
