import { useSelector } from "react-redux";
import { archiveTabsTitle } from "../../utils/manageTabs";

export function DisplayArchiveTabs() {
	const	archive = useSelector((state) => state.archive);

	return (
		<table className="archive-tabs">
		  <thead>
			<tr>
				{archiveTabsTitle.map((title, index) => {
					return <th key={index} className="archive-tabs-title">{title.name}</th>
				})}
			</tr>
		  </thead>
		  <tbody>
			{archive.map((item, index) => {
				return <tr key={index}>
					<td className="p-4 w-auto text-left">{item.title}</td>
					<td className="p-4 w-auto text-left">{item.themes}</td>
					<td className="p-4 w-auto text-left">{item.date}</td>
					<td className="p-4 w-auto text-left">{item.source ? 'Oui' : 'Non'}</td>
				</tr>
			})}
		  </tbody>
		</table>
	);
  }
  