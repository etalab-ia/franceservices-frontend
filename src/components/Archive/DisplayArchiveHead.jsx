import { archiveTabsTitle } from "../../constants/tabs"

export function DisplayArchiveHead() {
    return <thead>
		<tr>
			{archiveTabsTitle.map((title, index) => {
				return <th key={index} className="archive-tabs-title fr-p-4w">
					{title.name}
				</th>
			})}
		</tr>
	</thead>
}