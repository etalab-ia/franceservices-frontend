import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { Display } from "../Chat/Display";
import { useSelector } from "react-redux";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { summaryButton, summaryButtonDescription } from "../../constants/archive";
import { useDispatch } from "react-redux";
import { DisplaySheets } from "../Sheets/DisplaySheets";
import { Download } from "@codegouvfr/react-dsfr/Download";

export function DisplayArchiveTabs() {
	const	archive = useSelector((state) => state.archive);
	const	tabs = useSelector((state) => state.tabs);
	const	dispatch = useDispatch();
	const	selectedMessages = tabs.archiveTab !== NOT_SET ? [{ text: archive[tabs.archiveTab].question.query, sender: 'user'}] : [];

	const	handleClick = () => {
		dispatch({ type: 'RESET_ARCHIVE_TAB' });
	}

	return (
		<>
			{tabs.archiveTab === NOT_SET ?
				<table className="archive-tabs">
					<DisplayArchiveHead />
					<DisplayArchiveBody />
				</table>
				:
				<div className="col-message">
					<div className="row-message ml-14">
						<Button iconId="fr-icon-arrow-left-s-line-double" title={summaryButtonDescription} className="archive-summary-button" onClick={handleClick} priority="tertiary"/>
						<Button iconId="fr-icon-printer-line" title={summaryButtonDescription} className="archive-summary-button" onClick={handleClick} priority="tertiary"/>
						<Download
							details="JPG – 61,88 ko"
							label="Télécharger le document lorem ipsum sit dolores amet"
							linkProps={{
								href: '[À MODIFIER]'
							}}
							/>
					</div>
					<div className='row-message'>
						<div className='my-10 w-3/5 px-6 mx-14 border'>
							<Display messages={selectedMessages} archive={archive[tabs.archiveTab]}/>
						</div>
						<DisplaySheets />
					</div>
				</div>
			}
		</>
	);
}

  