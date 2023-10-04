import { Display } from "../components/Display";
import { UserMessage } from "../components/UserMessage";
import React from "react";

export function	TabContent({ content }) {

	return <div className={content.className}>{content.components.map((component, index) => 
			{return <React.Fragment key={index}>{component}</React.Fragment>})}
	</div>;
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
				/>,
			]
		},
		{
			id: "saved-tab",
			className:"chat-container",
			components: [
				<Display
					 state={state}
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