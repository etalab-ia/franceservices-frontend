import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOT_SET } from "../../constants/status";
import { archiveDateRole, archiveSourceRole, archiveTabRole, archiveTagsRole, archiveTitleRole } from "../../constants/archive";
import { Tag } from "@codegouvfr/react-dsfr/Tag";

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
			const	classNames = index === selected ? 'bg-light-purple' : 'bg-white';
			const	title = item.question.query.length > 50 ? item.question.query.slice(0, 50) + '...' : item.question.query;

			return item.tags && <tr role={archiveTabRole} key={index} onClick={() => handleClick(index)} className={classNames}>
				<td role={archiveTitleRole} className="archive-body fr-p-2w">{title}</td>
				<td role={archiveTagsRole} className="archive-body tags-font-size wrap-message fr-p-2w">{item.tags && item.tags.map((theme, index) => {
					return <Tag className="fr-m-1w">{theme} </Tag>
				})}</td>
				<td role={archiveDateRole} className="archive-body fr-p-2w">{item.date}</td>
				<td role={archiveSourceRole} className="archive-body fr-p-2w">{item.source}</td>
			</tr>
		})}
	</tbody>
}