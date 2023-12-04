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
	const	selectedMessages = tabs.archiveTab !== NOT_SET ? [{ text: archive[tabs.archiveTab].question.query, sender: 'user'}] : [];
	const   ref = useRef();

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