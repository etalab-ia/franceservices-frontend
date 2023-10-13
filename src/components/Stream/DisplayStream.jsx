import { useEffect, useState } from "react";
import { scrollToBottom } from "../../utils/manageEffects";
import { useSelector } from 'react-redux';
import { NOT_SET } from "../../constants/status";

export function DisplayStream(props) {
	const	{ setDisplay } = props;
	const	stream = useSelector((state) => state.stream);
	const	[activeTab, setActiveTab] = useState(stream.historyStream.length);

	// TODO: last tab === stream + is displayed / prev streams are stored in tabs
	useEffect(() => { scrollToBottom(); setDisplay(NOT_SET); }, [stream.response]);
	
	return (
		<div className="streaming bg-red-200">
			{stream.response.slice(1).map((item, index) => (
				<span key={index}>{item}</span>
			))}
		</div>
	);
}