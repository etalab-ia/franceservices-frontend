import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const setTilesFromSheets = (sheets, setTiles) => {
	sheets.map((sheet) => {
		const	url = sheet.url;
		const	parsedUrl = new URL(url);
		let		domain = parsedUrl.hostname;

		domain = domain.replace(/^www\./, '');
		domain = domain.replace(/^entreprendre\./, '');

		const newTile = {
			linkProps: { to: sheet.url },
			title: <><p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">{sheet.surtitre}</p><p>{sheet.title}</p></>,
			desc: domain
		};
		setTiles(prevTiles => [...prevTiles, newTile]);
	});
};

export const    MeetingTiles = () => {
	const   sheets = useSelector((state) => state.user.sheets);
	const   [tiles, setTiles] = useState([]);

	useEffect(() => {
		if (sheets.length === 0)
			return ;
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