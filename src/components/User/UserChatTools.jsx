import { useState } from "react";
import { userChatToolsFunc } from "../../constants/chatbotProps";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NOT_SET } from "../../constants/status";
import { GlobalColContainer } from "../Global/GlobalColContainer";

export function UserChatTools({ isArchive }) {
	const	auth = useSelector((state) => state.auth);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	archive = useSelector((state) => state.archive);
	const	feedback = useSelector((state) => state.feedback);
	const	dispatch = useDispatch();
	const	[isSelected, setIsSelected] = useState();

	const handleClick = (index) => {
		setIsSelected(index);
		setTimeout(() => setIsSelected(null), 100);
	};

	return (
		<div className="flex items-center fr-mt-2w">
			<GlobalColContainer>
				{userChatToolsFunc({ stream, archive, feedback }, dispatch).map((tool, index) => (
					<button 
						disabled={tool.name === 'redo' && (stream.isStoppable || isArchive !== NOT_SET)}
						key={index} className={index === isSelected ? "fr-m-1v opacity-0" : "fr-m-1v opacity-[1]"}
						onClick={() => { 
							handleClick(index); 
							tool.onClick({ auth, stream, user }, dispatch); 
						}}
						>
						<img
							src={tool.image}
							alt={tool.alt}
							title={tool.title}
						/>
					</button>
				))}
			</GlobalColContainer>
		</div>
	);
}