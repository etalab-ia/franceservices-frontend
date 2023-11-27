import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserChatTools } from "../User/UserChatTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { StreamingMessage } from "./StreamingMessage";
import { DisplayMessageTab } from "./DisplayMessageTab";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function DisplayArrayMessages({ messages, isArchive }) {
	const	tabsLen = messages.length;
	const	conditionTab = messages.length > 1;
	const	[activeTab, setActiveTab] = useState(tabsLen + 1);
	const	dispatch = useDispatch();

	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, []);

	return (
		<GlobalRowContainer>
			<UserChatTools type='sheets' isArchive={isArchive}/>
			<Avatar user="agent" />
			<StreamingMessage>{messages[activeTab - 1]}</StreamingMessage>
			<DisplayMessageTab
				isDisplayable={conditionTab}
				tabsLen={tabsLen}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
		</GlobalRowContainer>
	);
}