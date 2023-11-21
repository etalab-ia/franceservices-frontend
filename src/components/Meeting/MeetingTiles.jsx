import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const setTilesFromSheets = (sheets, tiles, setTiles) => {
	sheets.map((sheet) => {
		const url = "https://www.entreprendre.service-public.fr/vosdroits/F15252";

	const parsedUrl = new URL(url);
	let domain = parsedUrl.hostname;

	domain = domain.replace(/^www\./, '');
	domain = domain.replace(/^entreprendre\./, '');

	const newTile = {
		linkProps: { to: sheet.url },
		title: sheet.title,
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
		setTilesFromSheets(sheets, tiles, setTiles);
	}, [sheets]);

	return <>
		{tiles.map((tile, key) => {
			return <Tile
					key={key}
					horizontal
					className="fr-mb-3v"
					desc={tile.desc}
					linkProps={tile.linkProps}
					imageUrl="//www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png"
					title={tile.title}
					
				/>
		})}
	</>
}