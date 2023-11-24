import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";
import { NOT_SET } from "../../constants/status";
import { useSelector, useDispatch } from "react-redux";
import { Print } from "../Print/Print";
import React, { useRef, useEffect, useState } from 'react';
import { checkConnexion } from "../../utils/localStorage";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { archiveTabsTitle } from "../../utils/manageTabs";

export function DisplayArchiveTabs() {
	const	archive = useSelector((state) => state.archive);
	const	tabs = useSelector((state) => state.tabs);
	const	selectedMessages = tabs.archiveTab !== NOT_SET ? [{ text: archive[tabs.archiveTab].question.query, sender: 'user'}] : [];
	const   ref = useRef();
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	useEffect(() => {
		checkConnexion(auth, dispatch);
	}, []);


	return (
		<GlobalRowContainer>
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