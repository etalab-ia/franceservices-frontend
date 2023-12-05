import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";
import { Print } from "../Print/Print";
import React, { useRef } from 'react';
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";

export function DisplayArchiveTabs({ type }) {
	const	archive = useSelector((state) => state.archive);
	const	tabs = useSelector((state) => state.tabs);
	const	selectedMessages = archive && archive.length && tabs.archiveTab !== NOT_SET ? archive[tabs.archiveTab] : [];
	const   ref = useRef();

	// TODO: 
	// type === 'qr' -> chat page
	// type === 'meeting' -> meeting page

	return (
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			{tabs.archiveTab === NOT_SET ?
				<GlobalDiv>
					<table className="w-full">
						<DisplayArchiveHead />
						<DisplayArchiveBody />
					</table>
				</GlobalDiv>
				:
				<Print
					ref={ref}
					messages={selectedMessages}
					archive={archive[tabs.archiveTab]}
				/>
			}
		</GlobalRowContainer>
	);
}