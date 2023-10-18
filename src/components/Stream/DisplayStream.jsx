import { useEffect, useState } from "react";
import { scrollToBottom } from "../../utils/manageEffects";
import { useSelector } from 'react-redux';
import { NOT_SET } from "../../constants/status";
import previous from "../../../icons/usertools/previous.svg";
import next from "../../../icons/usertools/next.svg";
import { useDispatch } from 'react-redux';

const Stream = ({ response }) => {
	return <div>
		{response.slice(1).map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</div>
}

const HistoryStream = ({ history, index }) => {
	return <div>{history[index - 1]}</div>
}

export function DisplayStream({ setDisplay }) {
	const	stream = useSelector((state) => state.stream);
	const	tabsLen = stream.historyStream.length;
	const	[activeTab, setActiveTab] = useState(tabsLen + 1);
	const	dispatch = useDispatch();

	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, []);
	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, [activeTab]);
	useEffect(() => { scrollToBottom(); setDisplay(NOT_SET); }, [stream.response]);
	
	const	handleClick = (activeTab, setActiveTab, step) => { setActiveTab(activeTab + step); }

	return (
		<div>
			<div className="streaming">
				{!stream.historyStream.length || stream.response.length ?
					<Stream response={stream.response}/> : <HistoryStream history={stream.historyStream} index={activeTab}/>
				}
			</div>
			{!stream.isStreaming && stream.historyStream.length > 1 && <div className="row-message ml-4 mt-1">
				{activeTab > 1 && <button className="mr-2" onClick={() => handleClick(activeTab, setActiveTab, -1)}><img src={previous}/></button>}
				<p className="streaming-tabs">{activeTab} / {tabsLen}</p>
				{activeTab < tabsLen && <button className="ml-2" onClick={() => handleClick(activeTab, setActiveTab, 1)}><img src={next}/></button>}
			</div>}
		</div>
	);
}