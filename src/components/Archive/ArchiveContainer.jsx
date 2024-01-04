import React from "react"
import { Table } from "@codegouvfr/react-dsfr/Table"
import { archiveHeaders, setArchiveBody } from "../../utils/archive"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { useDispatch } from "react-redux"

export function ArchiveContainer({ archive }) {
	const dispatch = useDispatch()

	return (
		<GlobalRowContainer extraClass="flex justify-center">
			<Table
				bordered
				data={archive.map((item, index) =>
					setArchiveBody(item, index, item.messages[0].text, dispatch)
				)}
				headers={archiveHeaders}
			/>
		</GlobalRowContainer>
	)
}
