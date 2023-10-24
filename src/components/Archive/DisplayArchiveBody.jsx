import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOT_SET } from "../../constants/status";

export  function DisplayArchiveBody() {
	const	archive = useSelector((state) => state.archive);
	const	[selected, setSelected] = useState(NOT_SET);
	const	dispatch = useDispatch();

	const	handleClick = (index) => {
		setSelected(index);
		if (index === selected) {
			dispatch({ type: 'SET_SELECTED_ARCHIVE', nextSelectedArchive: selected });
			console.log('archive: ', archive)
		}
	}


	return <tbody>
		{archive.map((item, index) => {
			const	classNames = index === selected ? 'bg-[#F5F5FE]' : 'bg-white';
			return <tr key={index} onClick={() => handleClick(index)} className={classNames}>
				<td className="archive-body">{item.title}</td>
				<td className="archive-body text-[11px] flex flex-wrap">{item.themes.map((theme, index) => {
                    return <div key={index} className="archive-tags">{theme}</div>
                })}</td>
				<td className="archive-body">{item.date}</td>
				<td className="archive-body">{item.source ? 'Oui' : 'Non'}</td>
			</tr>
		})}
  </tbody>
}