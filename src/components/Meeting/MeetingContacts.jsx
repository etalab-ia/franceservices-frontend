import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { meetingContacts } from "../../constants/meeting";

export const    MeetingContacts = () => {
	const   sheets = useSelector((state) => state.user.sheets);
	const   [tiles, setTiles] = useState([]);

	useEffect(() => { setTiles(meetingContacts); }, [sheets]);

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