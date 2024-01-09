import { useDispatch, useSelector } from "react-redux"
import { Display } from "./Display"
import { UserMessage } from "../User/UserMessage"
import { useEffect } from "react"
import { scrollToBottom } from "../../utils/manageEffects"
import { ChatOverflowManagementContainer } from "./ChatOverflowManagementContainer"
import { ChatHeightContainer } from "./ChatHeightContainer"
import { RootState } from "types"

// TODO WHEN BACK IS READY: change archive type
export function ChatMainContainer({ archive }) {
	const user = useSelector((state: RootState) => state.user)
	const stream = useSelector((state: RootState) => state.stream)
	const dispatch = useDispatch()

	useEffect(() => {
		!archive && dispatch({ type: "RESET_USER" })
	}, [])

	// TODO: add feedback to scroll down
	useEffect(() => {
		scrollToBottom()
	}, [user, stream, dispatch])

	return (
		<ChatHeightContainer>
			<ChatOverflowManagementContainer>
				{archive ? (
					<Display messages={archive.messages} archive={true} />
				) : (
					<Display messages={user.messages} archive={false} />
				)}
			</ChatOverflowManagementContainer>
			{!archive && <UserMessage />}
		</ChatHeightContainer>
	)
}
