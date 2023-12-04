import { useEffect, useState } from "react";
import { NOT_SET } from "../../constants/status";
import { useDispatch, useSelector } from 'react-redux';
import { DisplayMessageTab } from "../Chat/DisplayMessageTab";
import { StreamingMessage } from "../Chat/StreamingMessage";
import { GlobalColContainer } from "../Global/GlobalColContainer";

const Stream = ({ response }) => {
	return <p className="streaming fr-mb-4w fr-p-3v fr-ml-3v">
		{response.map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</p>
}

export function DisplayStream({ stream, tabs, archive }) {
	const	tabsLen = stream.historyStream.length;
	const	[currLen, setCurrLen] = useState(tabsLen);
	const	[activeTab, setActiveTab] = useState(tabsLen + 1);
	const	conditionTab = !stream.isStreaming && stream.historyStream.length > 1;
	const	conditionStream = (!stream.historyStream.length || stream.response.length) && stream.historyStream.length === activeTab && tabs.activeTab === 0;
	const	dispatch = useDispatch();

	useEffect(() => {
		if (tabsLen != currLen) {
			setCurrLen(tabsLen);
			dispatch({ type: 'SET_ARCHIVE_MESSAGES', nextAgentResponse: stream.historyStream });
		}
		setActiveTab(tabsLen);
	}, [tabsLen])
	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, []);

	return (
		<GlobalColContainer>
			{conditionStream ?
				!archive ?
					<Stream response={stream.response}/>
					:
					<Stream response={archive.agentResponse}/>
				:
				!archive ?
					<StreamingMessage>{stream.historyStream[activeTab - 1]}</StreamingMessage>
					:
					<StreamingMessage>{archive.agentResponse[activeTab - 1]}</StreamingMessage>
			}
			<DisplayMessageTab
				isDisplayable={conditionTab}
				tabsLen={tabsLen}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				extraClass='fr-ml-2w'
			/>
		</GlobalColContainer>
	);
}