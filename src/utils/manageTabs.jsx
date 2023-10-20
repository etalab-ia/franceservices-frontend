import React from "react";
import { Display } from "../components/Chat/Display";
import { UserMessage } from "../components/User/UserMessage";
import { DisplayArchiveTabs } from "../components/Archive/DisplayArchiveTab";

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
			components: [ <DisplayArchiveTabs /> ]
		},
		// {
		// 	id: "saved-tab",
		// 	className:"chat-container",
		// 	components: [ <Display />, <UserMessage /> ]
		// }
	]

	return TabsProps;
}

export const	archiveTabsTitle = [
	{
		name: "Nom de la conversation"
	},
	{
		name: "Thèmes"
	},
	{
		name: "Date"
	},
	{
		name: "Source"
	},
]