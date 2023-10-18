import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserChatTools } from "../User/UserChatTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import previous from "../../../icons/usertools/previous.svg";
import next from "../../../icons/usertools/next.svg";
import { StreamingMessage } from "./StreamingMessage";
import { DisplayMessageTab } from "./DisplayMessageTab";

export function DisplayArrayMessages({ messages }) {
	const	tabsLen = messages.length;
	const	conditionTab = messages.length > 1;
	const	[activeTab, setActiveTab] = useState(tabsLen + 1);
	const	dispatch = useDispatch();

	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, []);

	return (
		<div className="streaming-container">
			<UserChatTools />
			<Avatar user="agent" />
			<div>
				<StreamingMessage>{messages[activeTab - 1]}</StreamingMessage>
				<DisplayMessageTab
					isDisplayable={conditionTab}
					tabsLen={tabsLen}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
		</div>
	);
}