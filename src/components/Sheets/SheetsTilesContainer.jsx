import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIndexesData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";
import { SheetsTiles } from "./SheetsTiles";
import { SheetsAdditionalTilesTitle } from "./SheetsAdditionalTilesTitle";

export const    SheetsTilesContainer = ({ currQuestion, archiveSheets, archiveAdditionalSheets, archiveWebservices, isModifiable }) => {
	const	userToken = useSelector((state) => state.auth.userToken);
	const   [tiles, setTiles] = useState([]);
	const   [additionalTiles, setAdditionalTiles] = useState([]);
	const	dispatch = useDispatch();
	const	user = useSelector((state => state.user));

	useEffect(() => {
		!archiveSheets && setIndexesData(
			currQuestion,
			setTiles,
			userToken,
			dispatch,
		);
		archiveSheets && dispatch({
			type: 'SET_SHEETS_FROM_ARCHIVE',
			nextSheets: archiveSheets,
			nextAdditionalSheets: archiveAdditionalSheets,
			nextWebservices: archiveWebservices
		});
	}, [currQuestion]);

	useEffect(() => {
		setTilesFromSheets(user.sheets, setTiles);
		setTilesFromSheets(user.additionalSheets, setAdditionalTiles);

	}, [user.additionalSheets]);

	return (
		<>
			<SheetsTiles
				tiles={tiles}
				isModifiable={isModifiable}
				type='main'
			/>
			{isModifiable && additionalTiles.length !== 0 && <>
				<SheetsAdditionalTilesTitle/>
				<SheetsTiles
					tiles={additionalTiles}
					isModifiable={isModifiable}
					type='additional'
				/>
			</>}
		</>
	);
}