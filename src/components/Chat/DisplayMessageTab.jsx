import { useDispatch } from "react-redux";
import { useEffect } from "react";
import previous from "../../../icons/usertools/previous.svg";
import next from "../../../icons/usertools/next.svg";

export function DisplayMessageTab({ isDisplayable, tabsLen, activeTab, setActiveTab }) {
	const	dispatch = useDispatch();

	useEffect(() => setActiveTab(tabsLen), [tabsLen])
	useEffect(() => { dispatch({ type: 'SWITCH_TAB', nextTab: activeTab }) }, [activeTab]);
	
	const	handleClick = (activeTab, setActiveTab, step) => { setActiveTab(activeTab + step); }

	return (
        <>
		    {isDisplayable && <div className="messages-tabs">
				{activeTab > 1 && <button className="mr-2" onClick={() => handleClick(activeTab, setActiveTab, -1)}>
					<img src={previous}/>
				</button>}
				<p className="streaming-tabs">{activeTab} / {tabsLen}</p>
				{activeTab < tabsLen && 
				<button className="ml-2" onClick={() => handleClick(activeTab, setActiveTab, 1)}>
					<img src={next}/>
				</button>}
			</div>}
        </>
	);
}