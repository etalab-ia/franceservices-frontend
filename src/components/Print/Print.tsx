import React, { useEffect, useState } from "react"
import { Button } from "@codegouvfr/react-dsfr/Button"
import ReactToPrint from "react-to-print"
import { Chatbot } from "../../pages/Chatbot"
import { MeetingPage } from "../Meeting/MeetingPage"
import { ArchiveType, Chat } from "../../../types"
import { useFetch } from "../../utils/hooks"
import { useApiUrls } from "../../constants/api"
import { preventDefaultLinkClickBehavior } from "type-route"

/**********************************************************************************************
		
	**	Print selected archive thanks to ReactToPrint OR go back to Archive summary

 **********************************************************************************************/

interface PrintProps {
	selectedChat: Chat
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const Print = React.forwardRef<HTMLDivElement, PrintProps>(
	({ selectedChat, setArchiveTab }, ref) => {
		const handleClick = () => {
			setArchiveTab(null)
		}
		window.addEventListener("popstate", () => {})
		const { getStreamsUrl } = useApiUrls()
		const [archive, setArchive] = useState<ArchiveType>()
		const token = localStorage.getItem("authToken")
		const [isLoading, setIsLoading] = useState(true)
		const getStreamsFromChat = async () => {
			const res = await useFetch(getStreamsUrl + `/${selectedChat.id}`, "GET", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: null,
			})

			setArchive(res.streams[res.streams.length - 1])
			setIsLoading(false)
		}

		useEffect(() => {
			getStreamsFromChat()
		}, [])

		if (isLoading) return <div>loading...</div>

		return (
			<>
				<div className="flex w-screen">
					<Button
						iconId="fr-icon-arrow-left-s-line-double"
						className="fr-mt-4w fr-ml-6w fr-mx-1w"
						onClick={handleClick}
						priority="tertiary"
					>
						{""}
					</Button>
					<ReactToPrint
						trigger={() => (
							<Button iconId="fr-icon-printer-line" className="fr-mt-4w" priority="tertiary">
								{" "}
							</Button>
						)}
						content={() => (ref && "current" in ref ? ref.current : null)}
					/>
				</div>
				<div ref={ref as React.RefObject<HTMLDivElement>}>
					{/* {selectedChat.type === "qa" && <Chatbot archive={archive} />}*/}
					{selectedChat.type === "meeting" && (
						<MeetingPage setGenerate={undefined} archive={archive} />
					)}
				</div>
			</>
		)
	}
)
