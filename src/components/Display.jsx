import { Avatar } from "./Avatar";

export function Display(props) {

	const	{ state } = props;
	
	return (
		<div className="chat">
			{state.messages.map((message, index) => {
				if (index === 0)
					return ;
				if (message.sender === 'user')
					return (
						<div key={index} className="flex flex-row mr-0 ml-auto">
							<div className="w-[644px] mr-[16px]">
								<div className='user-chat'>{message.text}</div>
							</div>
							<Avatar user={message.sender} />
						</div>		
					)
				return (
					<div key={index} className="flex flex-row">
						<Avatar user={message.sender} />
						<div className="w-[644px] ml-[16px]">
							<div className='agent-chat'>{message.text}</div>
						</div>
					</div>
				)
			})}
			{state.response.length != 0 ?
			<div className="flex flex-row">
				<Avatar user='agent' />
				<div className="w-[644px] ml-[16px] py-4 text-justify">
					{state.response.slice(1).map((item, index) => (
						<span key={index}>{item}</span>
					))}
				</div>
			</div> : null }
		</div>
	);
}