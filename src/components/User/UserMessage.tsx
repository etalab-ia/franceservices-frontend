import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { generateStream, useFetch } from "../../utils/hooks"
import { setHeaders } from "../../utils/setData"
import { useApiUrls } from "../../constants/api"
import { RootState } from "types"
import { CurrQuestionContext } from "../../utils/context/questionContext"

/*
 **
 */
export function UserMessage() {
	const stream = useSelector((state: RootState) => state.stream)
	const user = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	const [questionInput, setQuestionInput] = useState("")

	const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

	const { streamUrl, chatUrl } = useApiUrls()

	const handleChange = (e) => {
		e.preventDefault()

		setQuestionInput(e.target.value)
	}

	const handleClick = async () => {
		updateCurrQuestion({ ...currQuestion, query: questionInput })
		const headers = setHeaders(false)
		const chat_data = { chat_type: "meeting" }
		const chat = await useFetch(chatUrl, "POST", { data: JSON.stringify(chat_data), headers })
		console.log("button curr q: ", currQuestion, " question input: ", questionInput)
		console.log("update button curr q: ", currQuestion)
		dispatch({ type: "SET_USER_QUERY", nextUserQuery: questionInput, nextChatId: chat.id })
		stream.historyStream.length &&
			dispatch({
				type: "SET_MESSAGES",
				nextMessage: { text: stream.historyStream, sender: "agent" },
			})
		dispatch({ type: "RESET_STREAM_HISTORY" })
		dispatch({ type: "SET_MESSAGES", nextMessage: { text: questionInput, sender: "user" } })
	}

	/*

	**

	*/
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
