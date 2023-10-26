import { useEffect, useState } from "react";
import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { Display } from "../Chat/Display";
import { useSelector } from "react-redux";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { summaryButton } from "../../constants/archive";

export function DisplayArchiveTabs() {
	const	[index, setIndex] = useState(NOT_SET);
	const	[archiveToDisplay, setArchiveToDisplay] = useState(NOT_SET);
	const	archive = useSelector((state) => state.archive);
	const	selectedMessages = archiveToDisplay !== NOT_SET ? archive[archiveToDisplay].messages : [];

	const	handleClick = () => {
		setArchiveToDisplay(NOT_SET);
	}

	return (
		<>
			{archiveToDisplay === NOT_SET ?
				<table className="archive-tabs">
					<DisplayArchiveHead />
					<DisplayArchiveBody setIndex={setIndex} setArchiveToDisplay={setArchiveToDisplay} />
				</table>
				:
				<div>
					<Display messages={selectedMessages[index]} isArchive={true} />
					<Button className="ml-[170px] my-6" onClick={handleClick} priority="tertiary">
						{summaryButton}
					</Button>
				</div>
			}
		</>
	);
}

  