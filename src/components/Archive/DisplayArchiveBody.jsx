import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOT_SET } from "../../constants/status";

export  function DisplayArchiveBody() {
	const	archive = useSelector((state) => state.archive);
	const	[selected, setSelected] = useState(NOT_SET);
	const	dispatch = useDispatch();
	
	const	handleClick = (index) => {
		if (index === selected)
			dispatch({ type: 'SET_ARCHIVE_TAB', nextArchiveTab: index });
		setSelected(index);
	}

	return <tbody>
		{archive.map((item, index) => {
			const	classNames = index === selected ? 'bg-[#F5F5FE]' : 'bg-white';
			const	title = item.question.query.length > 50 ? item.question.query.slice(0, 50) + '...' : item.question.query;

			return item.tags && <tr key={index} onClick={() => handleClick(index)} className={classNames}>
				<td className="archive-body">{title}</td>
				<td className="archive-body text-[11px] flex flex-wrap">{item.tags && item.tags.map((theme, index) => {
					return <div key={index} className="archive-tags">{theme}</div>
				})}</td>
				<td className="archive-body">{item.date}</td>
				<td className="archive-body">{item.source}</td>
			</tr>
		})}
	</tbody>
}