import React from "react";
import { Display } from "../components/Chat/Display";
import { UserMessage } from "../components/User/UserMessage";

export function	TabContent({ content }) {
	return content.components.map((component, index) => 
			{ return <React.Fragment key={index}>{component}</React.Fragment> })
}

export function	initTabs() {
	const	TabsProps = [
		{
			id: "chatbot-tab",
			className:"chat-container",
			components: [ <Display />, <UserMessage /> ]
		},
		{
			id: "history-tab",
			className:"chat-container",
			components: [ <Display /> ]
		},
		// {
		// 	id: "saved-tab",
		// 	className:"chat-container",
		// 	components: [ <Display />, <UserMessage /> ]
		// }
	]

	return TabsProps;
}