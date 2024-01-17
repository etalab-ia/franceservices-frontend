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
		<div key="title" {...commonDivProps}>
			{title}
		</div>,
		// <div key="tags" {...commonDivProps}>
		// 	{tags}
		// </div>,
		<div key="date" {...commonDivProps}>
			{date}
		</div>,
		// TODO: change bc sources === sp + travail emploi
		<div key="source" {...commonDivProps}>
			Service Public
		</div>,
		<div key="type" {...commonDivProps}>
			{type}
		</div>,
	]
}
