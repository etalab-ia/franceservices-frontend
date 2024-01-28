import { useState } from "react"
import { userChatToolsFunc } from "../../utils/chat"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { GlobalColContainer } from "../Global/GlobalColContainer"

export function UserChatTools({ isArchive }) {
	// @ts-expect-error TS(2339): Property 'stream' does not exist on type 'unknown'... Remove this comment to see the full error message
	const stream = useSelector((state) => state.stream)
	// @ts-expect-error TS(2339): Property 'user' does not exist on type 'unknown'.
	const user = useSelector((state) => state.user)
	// @ts-expect-error TS(2339): Property 'archive' does not exist on type 'unknown... Remove this comment to see the full error message
	const archive = useSelector((state) => state.archive)
	// TODO: change
	// @ts-expect-error TS(2339): Property 'feedback' does not exist on type 'unknow... Remove this comment to see the full error message
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
