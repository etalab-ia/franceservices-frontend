import { useSelector } from "react-redux";

export  function DisplayArchiveBody() {
	const	archive = useSelector((state) => state.archive);

	return <tbody>
		{archive.map((item, index) => {
			return <tr key={index}>
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