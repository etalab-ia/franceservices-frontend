import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";
import { SheetsTiles } from "./SheetsTiles";
import { SheetsAdditionalTilesTitle } from "./SheetsAdditionalTilesTitle";

export const    SheetsTilesContainer = ({ currQuestion, archiveSheets, isModifiable, setIsModifiable }) => {
	const	userToken = useSelector((state) => state.auth.userToken);
	const   [tiles, setTiles] = useState([]);
	const   [additionalTiles, setAdditionalTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const   [additionalSheets, setAdditionalSheets] = useState([]);
	const	[removedSheets, setRemovedSheets] = useState([]);
	const	dispatch = useDispatch();

	useEffect(() => {
		!archiveSheets && setSheetsData(
			currQuestion,
			setTiles,
			userToken,
			dispatch,
			setSheets,
			setAdditionalSheets
		);
		archiveSheets && setSheets(archiveSheets);
	}, [currQuestion]);

	useEffect(() => {
		setRemovedSheets([]);
		setIsModifiable(false);
		setTilesFromSheets(sheets, setTiles);
		setTilesFromSheets(additionalSheets, setAdditionalTiles);
	}, [sheets]);

	useEffect(() => {
		dispatch({ type: 'REMOVE_SHEETS', indexToRemove: removedSheets});
	}, [removedSheets]);

	return (
		<>
			<SheetsTiles
				tiles={tiles}
				isModifiable={isModifiable}
				removedSheets={removedSheets}
				setRemovedSheets={setRemovedSheets}
				type='main'
			/>
			<SheetsAdditionalTilesTitle/>
			<SheetsTiles
				tiles={additionalTiles}
				isModifiable={isModifiable}
				removedSheets={removedSheets}
				setRemovedSheets={setRemovedSheets}
				type='additional'
			/>
		</>
	);
}