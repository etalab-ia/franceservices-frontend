import { useState } from "react";
import { userChatToolsFunc } from "../../constants/chatbotProps";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export function UserChatTools({ type }) {
	const	auth = useSelector((state) => state.auth);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	archive = useSelector((state) => state.archive);
	const	feedback = useSelector((state) => state.feedback);
	const	dispatch = useDispatch();
	const	[isSelected, setIsSelected] = useState();
	const 	extraMargin = type ? "ml-[110px]" : "";

	const handleClick = (index) => {
		setIsSelected(index);
		setTimeout(() => setIsSelected(null), 100);
	};

	return (
		<div className={`user-chat-tools-container ${extraMargin}`}>
		  	{userChatToolsFunc({ auth, stream, archive, feedback, user }, dispatch, type).map((tool, index) => (
				<button 
					disabled={stream.isStoppable}
					key={index} className="mr-3"
					style={{
						opacity: index === isSelected ? 0 : 1,
						boxShadow: index === isSelected ? '0 0 10px 3px rgba(0, 0, 0, 0.5)' : 'none',
					}}
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
		</div>
	);
}