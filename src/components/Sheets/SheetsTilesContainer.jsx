import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";
import { SheetsTiles } from "./SheetsTiles";

export const    SheetsTilesContainer = ({ currQuestion, archiveSheets, isModifiable, setIsModifiable, removedSheets, setRemovedSheets, selectedSheets, setSelectedSheets }) => {
	const	userToken = useSelector((state) => state.auth.userToken);
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
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
		dispatch({ type: 'REMOVE_SHEETS', indexToRemove: removedSheets});
	}, [removedSheets]);

	return (
		<SheetsTiles
			tiles={tiles}
			isModifiable={isModifiable}
			removedSheets={removedSheets}
			setRemovedSheets={setRemovedSheets}
		/>
	);
}