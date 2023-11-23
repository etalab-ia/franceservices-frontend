import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../utils/hooks";
import { indexesUrl } from "../../constants/api";
import { setHeaders, setSheetsData } from "../../utils/setData";

const setTilesFromSheets = (sheets, setTiles) => {
	sheets.map((sheet) => {
		const	url = sheet.url;
		const	parsedUrl = new URL(url);
		let		domain = parsedUrl.hostname;

		domain = domain.replace(/^www\./, '');
		domain = domain.replace(/^entreprendre\./, '');

		const newTile = {
			linkProps: { to: sheet.url },
			title: 
			<>
				<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
					{sheet.surtitre}</p><p>{sheet.title}
				</p>
			</>,
			desc: domain
		};
		setTiles(prevTiles => [...prevTiles, newTile]);
	});
};

export const    MeetingTiles = ({ currQuestion }) => {
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const	userToken = useSelector((state) => state.auth.userToken);

	const getSheetsData = async () => {
		const sheetsResp = await useFetch(indexesUrl, 'POST', {
			data: setSheetsData(currQuestion),
			headers: setHeaders(userToken, false),
		});
		setSheets(sheetsResp);
	};

	useEffect(() => { getSheetsData(); }, []);
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