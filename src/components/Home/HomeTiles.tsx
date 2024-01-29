import { Tile } from "@codegouvfr/react-dsfr/Tile"

export const TileContainer = ({ children }) => {
	return (
		<div className="container fr-mr-2w" style={{ width: 300 }}>
			{children}
		</div>
	)
}

export const HomeTiles = ({ tiles }) => {
	return (
		<div className="fr-grid-row">
			{tiles.map((tile, key) => {
				return (
					<TileContainer key={key}>
						<Tile
							className={tile.className}
							desc={tile.desc}
							enlargeLink
							linkProps={tile.linkProps}
							imageUrl={tile.imageUrl}
							title={tile.title}
						/>
					</TileContainer>
				)
			})}
		</div>
	)
}
