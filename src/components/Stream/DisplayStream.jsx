import { useEffect, useState } from "react";
import { scrollToBottom } from "../../utils/manageEffects";
import { useSelector } from 'react-redux';
import { NOT_SET } from "../../constants/status";
import { useDispatch } from 'react-redux';
import { DisplayMessageTab } from "../Chat/DisplayMessageTab";
import { StreamingMessage } from "../Chat/StreamingMessage";

const Stream = ({ response }) => {
	return <div className="streaming">
		{response.map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</div>
}

export function DisplayStream({ stream, tabs, archive }) {
	const	tabsLen = stream.historyStream.length;
	const	[activeTab, setActiveTab] = useState(tabsLen + 1);
	const	conditionTab = !stream.isStreaming && stream.historyStream.length > 1;
	const	conditionStream = (!stream.historyStream.length || stream.response.length) && stream.historyStream.length === activeTab && tabs.activeTab === 0;
	const	dispatch = useDispatch();

	useEffect(() => setActiveTab(tabsLen), [tabsLen])
	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, []);
	useEffect(() => { scrollToBottom(); }, [stream.response]);

	return (
		<div>
			{conditionStream ?
				archive === NOT_SET ?
					<Stream response={stream.response}/>
					:
					<Stream response={archive.agentResponse[0]}/>
				:
				archive === NOT_SET ?
					<StreamingMessage>{stream.historyStream[activeTab - 1]}</StreamingMessage>
					:
					<StreamingMessage>{archive.agentResponse[activeTab - 1]}</StreamingMessage>
			}
			<DisplayMessageTab
				isDisplayable={conditionTab}
				tabsLen={tabsLen}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
		</div>
	);
}