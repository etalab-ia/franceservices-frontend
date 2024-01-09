import { useState } from "react"
import { userChatToolsFunc } from "../../utils/chat"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { GlobalColContainer } from "../Global/GlobalColContainer"

export function UserChatTools({ isArchive }) {
	const stream = useSelector((state) => state.stream)
	const user = useSelector((state) => state.user)
	const archive = useSelector((state) => state.archive)
	// TODO: change
	const feedback = useSelector((state) => state.feedback)
	const dispatch = useDispatch()
	const [isSelected, setIsSelected] = useState()

	const handleClick = (index) => {
		setIsSelected(index)
		setTimeout(() => setIsSelected(null), 100)
	}

	return (
		<div className="flex items-center fr-mt-2w">
			<GlobalColContainer>
				{userChatToolsFunc({ stream, archive, feedback, user }, dispatch).map((tool, index) => (
					<button
						disabled={tool.name === "redo" && (stream.isStreaming || isArchive)}
						key={index}
						className={index === isSelected ? "fr-m-1v opacity-0" : "fr-m-1v opacity-[1]"}
						onClick={() => {
							handleClick(index)
							tool.onClick({ stream, user }, dispatch)
						}}
					>
						<img src={tool.image} alt={tool.alt} title={tool.title} />
					</button>
				))}
			</GlobalColContainer>
		</div>
	)
}
