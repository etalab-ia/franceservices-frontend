import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { Chat } from "../../../types"

interface ArchiveContainerProps {
	chatsId: Chat[]
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveContainer({ chatsId, setArchiveTab }: ArchiveContainerProps) {
	return (
		<GlobalRowContainer extraClass="flex justify-center flex-">
			<Table
				bordered
				className="w-full"
				data={chatsId.map((chat, index) =>
					setArchiveBody({
						item: chat,
						index: index,
						name: chat.name || `Chat ${index + 1}`,
						setArchiveTab: setArchiveTab,
					})
				)}
				headers={archiveHeaders}
			/>
		</GlobalRowContainer>
	)
}
