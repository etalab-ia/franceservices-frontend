import { redoUserQuestion } from "../../constants/chatbotProps"
import { BotQuestion } from "../Global/BotQuestion"
import { Avatar } from "./Avatar"
import { NotifyArchiving } from "../Archive/NotifyArchiving"
import { useSelector } from "react-redux"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"

export function NewQuestion() {
	const user = useSelector((state) => state.user)

	return (
		<>
			<GlobalRowContainer>
				<Avatar user="agent" />
				{redoUserQuestion}
			</GlobalRowContainer>
			<BotQuestion id="newQuestion" choice={user.choices.newQuestion} />
			{!user.choices.newQuestion && <NotifyArchiving />}
		</>
	)
}
