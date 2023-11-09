import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { Display } from "../Chat/Display";
import { useSelector } from "react-redux";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { summaryButton } from "../../constants/archive";
import { useDispatch } from "react-redux";

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
				<div>
					<Display messages={selectedMessages} archive={archive[tabs.archiveTab]}/>
					<Button className="archive-summary-button" onClick={handleClick} priority="tertiary">
						{summaryButton}
					</Button>
				</div>
			}
		</>
	);
}

  