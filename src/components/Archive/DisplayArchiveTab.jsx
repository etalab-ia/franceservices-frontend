import { useEffect, useState } from "react";
import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { Display } from "../Chat/Display";
import { useSelector } from "react-redux";

export function DisplayArchiveTabs() {
	const	[index, setIndex] = useState(NOT_SET);
	const	[archiveToDisplay, setArchiveToDisplay] = useState(NOT_SET);
	const	archive = useSelector((state) => state.archive);
	const	selectedMessages = archiveToDisplay !== NOT_SET ? archive[archiveToDisplay].messages : [];

	return (
		<>
			{archiveToDisplay === NOT_SET ?
				<table className="archive-tabs">
					<DisplayArchiveHead />
					<DisplayArchiveBody setIndex={setIndex} setArchiveToDisplay={setArchiveToDisplay} />
				</table>
				:
				<Display messages={selectedMessages[index]} />
			}
		</>
	);
}

  