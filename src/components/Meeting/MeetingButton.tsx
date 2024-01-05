import Button from "@codegouvfr/react-dsfr/Button"
import { meetingGenerationPage } from "../../constants/meeting"
import { useDispatch, useSelector } from "react-redux"
import { usePost } from "../../utils/hooks"
import { useEffect } from "react"
import { setQuestionWithContext } from "../../utils/setData"
import { RootState } from "types"

/**

    FUNCTIONS:

        setQuestionWithContext: improve user prompt with current question & context to send
            more precised user_query to /stream endpoint.

      handleClick: setGenerate to true to switch to meeting stream page

 **/

export function MeetingButton({ isDisable, currQuestion, setGenerate, context }) {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)

	const handleClick = () => {
		const questionWithContext = setQuestionWithContext(currQuestion, context)

		dispatch({ type: "SET_USER_QUERY", nextUserQuery: questionWithContext })
	}

	useEffect(() => {
		if (!user.question.query.length) return
		setGenerate(true)
		dispatch({ type: "RESET_QUESTION_FIELDS" })
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
