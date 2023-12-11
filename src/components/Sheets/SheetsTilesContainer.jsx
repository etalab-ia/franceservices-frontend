import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";
import { SheetsAdditionalButtons } from "./SheetsAdditionalButtons";
import { SheetsTiles } from "./SheetsTiles";

export const    SheetsTilesContainer = ({ currQuestion, archiveSheets, userToken }) => {
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const	[isModifiable, setIsModifiable] = useState(false);
	const	[selectedSheets, setSelectedSheets] = useState([]);
	const	[removedSheets, setRemovedSheets] = useState([]);
	const	dispatch = useDispatch();

	useEffect(() => {
		setSheetsData(
			currQuestion,
			archiveSheets,
			setTiles,
			setSheets,
			userToken,
			dispatch
		);
	}, [currQuestion]);

	useEffect(() => {
		setSelectedSheets([]);
		setRemovedSheets([]);
		setIsModifiable(false);
		setTilesFromSheets(sheets, setTiles);
	}, [sheets]);

	useEffect(() => {
		setSelectedSheets([]);
	}, [removedSheets]);

	return <>
		<SheetsAdditionalButtons
			isModifiable={isModifiable}
			setIsModifiable={setIsModifiable}
			removedSheets={removedSheets}
			setRemovedSheets={setRemovedSheets}
			selectedSheets={selectedSheets}
		/>
		<SheetsTiles
			tiles={tiles}
			isModifiable={isModifiable}
			selectedSheets={selectedSheets}
			setSelectedSheets={setSelectedSheets}
			removedSheets={removedSheets}
		/>
	</>
}