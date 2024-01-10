import React from "react"
import { Button } from "@codegouvfr/react-dsfr/Button"
import ReactToPrint from "react-to-print"
import { Chatbot } from "../../pages/Chatbot"
import { MeetingPage } from "../Meeting/MeetingPage"

/**********************************************************************************************
		
	**	Print selected archive thanks to ReactToPrint OR go back to Archive summary

 **********************************************************************************************/

// TODO: change archive type
interface PrintProps {
	archive: any
	type: string
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const Print = React.forwardRef<HTMLDivElement, PrintProps>(
	({ archive, type, setArchiveTab }, ref) => {
		const handleClick = () => {
			setArchiveTab(null)
		}

		return (
			<>
				<div className="flex w-screen">
					<Button
						iconId="fr-icon-arrow-left-s-line-double"
						className="fr-mt-4w fr-ml-6w fr-mx-1w"
						onClick={handleClick}
						priority="tertiary"
					>
						{" "}
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
					{type === "qr" && <Chatbot archive={archive} />}
					{type === "meetings" && (
						<MeetingPage currQuestion={archive.messages[0].text} archive={archive} />
					)}
				</div>
			</>
		)
	}
)
