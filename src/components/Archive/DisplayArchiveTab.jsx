import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";
import { Print } from "../Print/Print";
import React, { useRef } from 'react';
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { ArchiveContainer } from "./ArchiveContainer";

export function DisplayArchiveTabs() {
	const	archive = useSelector((state) => state.archive);
	const	tabs = useSelector((state) => state.tabs);
	const   ref = useRef();

	return (
		<GlobalRowContainer extraClass='fr-grid-row--center items-center'>
			{tabs.archiveTab === NOT_SET ?
				<ArchiveContainer archive={archive}/>
				:
				<Print
					ref={ref}
					archive={archive[tabs.archiveTab]}
					type={tabs.type}
				/>
			}
		</GlobalRowContainer>
	);
}