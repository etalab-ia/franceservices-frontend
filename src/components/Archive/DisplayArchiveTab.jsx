import { useState } from "react";
import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { Display } from "../Chat/Display";
import { useSelector } from "react-redux";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { summaryButton } from "../../constants/archive";

export function DisplayArchiveTabs() {
	const	[archiveToDisplay, setArchiveToDisplay] = useState(NOT_SET);
	const	archive = useSelector((state) => state.archive);
	const	selectedMessages = archiveToDisplay !== NOT_SET ? [{ text: archive[archiveToDisplay].question.query, sender: 'user'}] : [];

	const	handleClick = () => {
		setArchiveToDisplay(NOT_SET);
	}

	return (
		<>
			{archiveToDisplay === NOT_SET ?
				<table className="archive-tabs">
					<DisplayArchiveHead />
					<DisplayArchiveBody setArchiveToDisplay={setArchiveToDisplay} />
				</table>
				:
				<div>
					<Display messages={selectedMessages} isArchive={true} archive={archive[archiveToDisplay]}/>
					<Button className="ml-[170px] my-6" onClick={handleClick} priority="tertiary">
						{summaryButton}
					</Button>
				</div>
			}
		</>
	);
}

  