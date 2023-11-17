import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { useSelector, useDispatch } from "react-redux";
import { Print } from "../Print/Print";
import React, { useRef, useEffect } from 'react';
import { checkConnexion } from "../../utils/localStorage";

export function DisplayArchiveTabs() {
	const	archive = useSelector((state) => state.archive);
	const	tabs = useSelector((state) => state.tabs);
	const	selectedMessages = tabs.archiveTab !== NOT_SET ? [{ text: archive[tabs.archiveTab].question.query, sender: 'user'}] : [];
	const   ref = useRef();
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	useEffect(() => { checkConnexion(auth, dispatch); }, []);

	return (
		<>
			{tabs.archiveTab === NOT_SET ?
				<table className="archive-tabs">
					<DisplayArchiveHead />
					<DisplayArchiveBody />
				</table>
				:
				<Print
					ref={ref}
					messages={selectedMessages}
					archive={archive[tabs.archiveTab]}
				/>
			}
		</>
	);
}