import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";

export const    MeetingTiles = ({ currQuestion, archiveSheets }) => {
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const	userToken = useSelector((state) => state.auth.userToken);
	const	user = useSelector((state) => state.user);
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
	}, [user.question.query]);

	useEffect(() => {
		setTilesFromSheets(sheets, setTiles);
	}, [sheets]);

	return <>
		{tiles.map((tile, key) => {
			return <Tile
				key={key}
				horizontal
				className="fr-mb-3v"
				desc={tile.desc}
				linkProps={tile.linkProps}
				title={tile.title}
			/>
		})}
	</>
}