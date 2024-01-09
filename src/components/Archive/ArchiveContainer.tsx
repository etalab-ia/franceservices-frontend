import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"

// TODO WHEN BACK IS READY: change archive type
interface ArchiveContainerProps {
	archive: any
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveContainer({ archive, setArchiveTab }: ArchiveContainerProps) {
	return (
		<GlobalRowContainer extraClass="flex justify-center">
			<Table
				bordered
				data={archive.map((item, index) =>
					setArchiveBody({
						item: item,
						index: index,
						userQuestion: item.messages[0].text,
						setArchiveTab: setArchiveTab,
					})
				)}
				headers={archiveHeaders}
			/>
		</GlobalRowContainer>
	)
}
