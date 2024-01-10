import Button from "@codegouvfr/react-dsfr/Button"
import { meetingGenerationPage } from "../../constants/meeting"
import { useDispatch, useSelector } from "react-redux"
import { useFetch } from "../../utils/hooks"
import { useEffect } from "react"
import { setHeaders, setQuestionWithContext } from "../../utils/setData"
import { RootState } from "types"
import { chatUrl } from "../../constants/api"

/**

    FUNCTIONS:

        setQuestionWithContext: improve user prompt with current question & context to send
            more precised user_query to /stream endpoint.

      handleClick: setGenerate to true to switch to meeting stream page + create new chat id for meeting

 **/

export function MeetingButton({ isDisable, currQuestion, setGenerate, context }) {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)

	const handleClick = async () => {
		const questionWithContext = setQuestionWithContext(currQuestion, context)
		const headers = setHeaders(false)
		const chat_data = { chat_type: "meeting" }
		const chat = await useFetch(chatUrl, "POST", { data: JSON.stringify(chat_data), headers })
		dispatch({ type: "SET_USER_QUERY", nextUserQuery: questionWithContext, nextChatId: chat.id })
	}

	useEffect(() => {
		if (!user.question.query.length) return setGenerate(false)
		setGenerate(true)
	}, [user.question])

	return (
		<Button
			className="w-full flex justify-center fr-mt-3w"
			onClick={handleClick}
			disabled={isDisable}
		>
			{meetingGenerationPage}
		</Button>
	)
}
