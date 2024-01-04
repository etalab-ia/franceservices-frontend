import { Tile } from "@codegouvfr/react-dsfr/Tile"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setTilesFromContacts } from "../../constants/meeting"

export const MeetingContacts = () => {
	const [tiles, setTiles] = useState([])
	const user = useSelector((state) => state.user)

	useEffect(() => {
		setTilesFromContacts(user.webservices, setTiles)
	}, [user.webservices])

	return (
		<>
			{tiles.map((tile, key) => {
				return (
					<Tile
						key={key}
						horizontal
						className="fr-mb-3v"
						desc={tile.desc}
						linkProps={tile.linkProps}
						title={tile.title}
					/>
				)
			})}
		</>
	)
}
