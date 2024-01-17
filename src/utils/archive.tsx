import { Tag } from "@codegouvfr/react-dsfr/Tag"
import { Chat } from "../../types"

export const archiveHeaders = ["Nom de la conversation", "Date de création", "Source", "Type"]

// Set archive tags from /indexes sheets surtitre etc
const setArchiveTags = (array: string[]) => {
	const tags = array.map((theme, index) => {
		return (
			<Tag key={index} className="fr-m-1w">
				{theme}{" "}
			</Tag>
		)
	})

	return tags
}

// TODO: set types
interface ArchiveBodyProps {
	item: Chat
	index: number
	name: string
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const setArchiveBody = ({ item, index, name, setArchiveTab }: ArchiveBodyProps) => {
	const title = name.length > 78 ? name.slice(0, 78) + "..." : name
	const tags = [] // setArchiveTags(item.tags)
	const type = item.type === "qr" ? "Question" : "Rendez-vous"
	const date = new Date(item.creationDate).toLocaleDateString("fr-FR")
	const handleClick = () => {
		setArchiveTab(index)
	}

	const commonDivProps = {
		key: index,
		onClick: handleClick,
		className: "cursor-pointer",
	}

	return [
		<td key="title" style={cellStyle} {...commonDivProps}>
			{title}
		</td>,
		// <td key="tags" >{tags}</td>,
		<td key="date" style={cellStyle} {...commonDivProps}>
			{date}
		</td>,
		<td key="source" style={cellStyle} {...commonDivProps}>
			Service Public
		</td>,
		<td key="type" style={cellStyle} {...commonDivProps}>
			{type}
		</td>,
	]
}

const cellStyle = {
	textAlign: "left" as const,
	padding: "10px",
	cursor: "pointer",
}
