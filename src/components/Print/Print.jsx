import React from "react"
import { PrintTools } from "./PrintTools"
import { Chatbot } from "../../pages/Chatbot"
import { MeetingPage } from "../Meeting/MeetingPage"

export const Print = React.forwardRef(({ archive, type }, ref) => {
	return (
		<>
			<PrintTools ref={ref} />
			<div ref={ref}>
				{type === "qr" && <Chatbot archive={archive} />}
				{type === "meetings" && (
					<MeetingPage currQuestion={archive.messages[0].text} archive={archive} />
				)}
			</div>
		</>
	)
})
