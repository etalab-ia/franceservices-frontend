import { useEffect, useState } from "react";
import { scrollToBottom } from "../../utils/manageEffects";
import { useSelector } from 'react-redux';
import { NOT_SET } from "../../constants/status";
import previous from "../../../icons/usertools/previous.svg";
import next from "../../../icons/usertools/next.svg";
import { useDispatch } from 'react-redux';

// const history = [];
const history = ["tab 1", "tab 2", "tab 3"];
const stream = ["Ceci est un streaming"];

const Stream = () => {
	return <div>
		{stream.map((res, index) => {
			return <div key={index}>{res}</div>
		})}
		{/* {response.slice(1).map((item, index) => (
			<span key={index}>{item}</span>
		))} */}
	</div>
}

const HistoryStream = ({ index }) => {
	return <div>{history[index - 1]}</div>
}

export function DisplayStream(props) {
	const	{ setDisplay } = props;
	const	stream = useSelector((state) => state.stream);
	const	tabsLen = history.length + 1;
	const	[activeTab, setActiveTab] = useState(tabsLen);
	const	dispatch = useDispatch();
	// const	[activeTab, setActiveTab] = useState(stream.historyStream.length);

	// TODO: replace local variable
	useEffect(() => { scrollToBottom(); setDisplay(NOT_SET); }, [stream.response]);
	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, [activeTab]);
	
	const	handleClick = (activeTab, setActiveTab, step) => { setActiveTab(activeTab + step); }

	// console.log(activeTab, ' len: ', tabsLen);

	return (
		<div>
			<div className="streaming">
				{activeTab === tabsLen ?
					<Stream /> : <HistoryStream index={activeTab}/>
				}
			</div>
			{/* <Stream response={stream.response}/> */}
			{history.length > 0 && <div className="row-message ml-4 mt-1">
				{activeTab > 1 && <button className="mr-2" onClick={() => handleClick(activeTab, setActiveTab, -1)}><img src={previous}/></button>}
				<p className="text-[#666] text-sm font-medium">{activeTab} / {tabsLen}</p>
				{activeTab < tabsLen && <button className="ml-2" onClick={() => handleClick(activeTab, setActiveTab, 1)}><img src={next}/></button>}
			</div>}
		</div>
	);
}