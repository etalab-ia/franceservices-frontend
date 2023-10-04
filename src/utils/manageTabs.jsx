import { Display } from "../components/Display";
import { UserChatTools } from "../components/UserChatTools";
import { UserMessage } from "../components/UserMessage";
import React from "react";

export function	TabContent({ content }) {

	return content.components.map((component, index) => 
			{return <React.Fragment key={index}>{component}</React.Fragment>})
}

export function InitTabs(props) {
	
	const	{ state, dispatch } = props;

	const TabsProps = [
		{
			id: "chatbot-tab",
			className:"chat-container",
			components: [
				<Display
					 state={state}
					 dispatch={dispatch}
				 />,
				 <UserMessage 
					 state={state}
					 dispatch={dispatch}
				 />
			]
		},
		{
			id: "history-tab",
			className:"chat-container",
			components: [
				<Display
					 state={state}
					 dispatch={dispatch}
				/>,
			]
		},
		{
			id: "saved-tab",
			className:"chat-container",
			components: [
				<Display
					 state={state}
					 dispatch={dispatch}
				 />,
				 <UserMessage 
					 state={state}
					 dispatch={dispatch}
				 />
			]
		}
	]

	return TabsProps;
}