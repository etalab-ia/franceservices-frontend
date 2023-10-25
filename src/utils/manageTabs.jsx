import React, { useEffect } from "react";
import { Display } from "../components/Chat/Display";
import { UserMessage } from "../components/User/UserMessage";
import { DisplayArchiveTabs } from "../components/Archive/DisplayArchiveTab";
import { useSelector } from "react-redux";
import { NOT_SET } from "../constants/status";

export function	TabContent({ content }) {
	return content.components.map((component, index) => 
			{ return <React.Fragment key={index}>{component}</React.Fragment> })
}

export function	initTabs() {
	const	archive = useSelector((state) => state.archive);
	const	history = useSelector((state) => state.history);

	
	useEffect(() => {console.log('selected: ', archive)}, [archive.selectedArchive])

	const	TabsProps = [
		{
			id: "chatbot-tab",
			className:"chat-container",
			components: [ <Display messages={history.messages}/>, <UserMessage /> ]
		},
		{
			id: "history-tab",
			className:"chat-container",
			components: archive.map((item) => item.selectedArchive !== NOT_SET ? [<Display messages={item.messages}/>] : [ <DisplayArchiveTabs /> ])
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