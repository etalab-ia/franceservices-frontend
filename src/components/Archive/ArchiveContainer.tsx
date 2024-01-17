import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { Chat } from "../../../types"
import { GlobalTitle } from "../Global/GlobalTitle"
import { useState } from "react"
//import { FaSort } from "react-icons/fa" // Assuming you are using react-icons for icons

interface ArchiveContainerProps {
	chatsId: Chat[]
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveContainer({ chatsId, setArchiveTab }: ArchiveContainerProps) {
	const [isOldestFirst, setIsOldestFirst] = useState(false)

	const toggleSortOrder = () => {
		setIsOldestFirst(!isOldestFirst)
	}

	const sortedChats = chatsId.sort((a, b) => {
		return isOldestFirst
			? new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
			: new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
	})

	return (
		<div className="fr-container fr-pt-5w">
			<GlobalTitle>Consulter mes fiches rendez-vous</GlobalTitle>
			<table className="w-full">
				<thead style={{ borderBottom: "2px solid #000" }}>
					<tr>
						{archiveHeaders.map((header, index) => (
							<th key={index} style={{ textAlign: "left", padding: "10px" }}>
								{header}
								{header === "Date de création" && (
									<span
										onClick={toggleSortOrder}
										className={`fr-icon-arrow-${
											isOldestFirst ? "down" : "up"
										}-s-fill cursror-pointer`}
										aria-hidden="true"
									></span>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedChats.map((chat, index) => (
						<tr key={chat.id} className="fr-py-4w ">
							{setArchiveBody({
								item: chat,
								index: index,
								name: chat.name || `Chat ${index + 1}`,
								setArchiveTab: setArchiveTab,
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
