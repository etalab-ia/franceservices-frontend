import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOT_SET } from "../../constants/status";

export  function DisplayArchiveBody() {
	const	archive = useSelector((state) => state.archive);
	const	[selected, setSelected] = useState(NOT_SET);
	const	dispatch = useDispatch();

	const	handleClick = (e, index) => {
		console.log(e.target, ' ', index)
		setSelected(index);
		if (index === selected)
		{
			console.log('set selected archive')
		dispatch({ type: 'SET_SELECTED_ARCHIVE', nextSelectedArchive: selected });
		}
	}


	return <tbody>
		{archive.map((item, index) => {
			console.log('index is: ', index)
			const	classNames = index === selected ? 'bg-[#F5F5FE]' : 'bg-white';
			return <tr key={index} onClick={(e) => handleClick(e, index)} className={classNames}>
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