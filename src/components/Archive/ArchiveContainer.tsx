import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"

// TODO: set types
export function ArchiveContainer({ archive, setArchiveTab }) {
	return (
		<GlobalRowContainer extraClass="flex justify-center">
			<Table
				bordered
				data={archive.map((item, index) =>
					setArchiveBody(item, index, item.messages[0].text, setArchiveTab)
				)}
				headers={archiveHeaders}
			/>
		</GlobalRowContainer>
	)
}
