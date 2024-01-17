import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { Chat } from "../../../types"
import { GlobalTitle } from "../Global/GlobalTitle"

interface ArchiveContainerProps {
	chatsId: Chat[]
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveContainer({ chatsId, setArchiveTab }: ArchiveContainerProps) {
	return (
		<div className="fr-container fr-pt-5w">
			<GlobalTitle>Consulter mes fiches rendez-vous</GlobalTitle>
			<table className="w-full">
				<thead>
					<tr>
						{archiveHeaders.map((header, index) => (
							<th key={index} style={{ textAlign: "left", padding: "10px" }}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{chatsId.map((chat, index) => (
						<tr key={index}>
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
