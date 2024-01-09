import { useSelector } from "react-redux"
import { Print } from "../Print/Print"
import { useRef, useState } from "react"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { ArchiveContainer } from "./ArchiveContainer"
import { RootState } from "types"

export function DisplayArchiveTabs() {
	const archive = useSelector((state: RootState) => state.archive)
	const [archiveTab, setArchiveTab] = useState<number | null>(null)
	const ref = useRef<HTMLDivElement>(null)

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center items-center">
			{!archive[archiveTab] ? (
				<ArchiveContainer archive={archive} setArchiveTab={setArchiveTab} />
			) : (
				<Print
					ref={ref}
					archive={archive[archiveTab]}
					type={archive[archiveTab].type}
					setArchiveTab={setArchiveTab}
				/>
			)}
		</GlobalRowContainer>
	)
}