import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../utils/hooks";
import { indexesUrl } from "../../constants/api";
import { getSheetsData, setHeaders, setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";

export const    MeetingTiles = ({ currQuestion }) => {
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const	userToken = useSelector((state) => state.auth.userToken);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		setTiles([]);
		if (currQuestion.length === 0)
			return ;
		getSheetsData(setSheets, currQuestion, userToken, dispatch);
	}, [user.question.query]);

	useEffect(() => { setTilesFromSheets(sheets, setTiles); }, [sheets]);

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