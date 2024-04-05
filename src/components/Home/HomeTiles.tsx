import { Tile } from '@codegouvfr/react-dsfr/Tile'
import type { Tile as TTile } from '@types'

const TileContainer = ({ children }) => {
  return (
    <div className="fr-mr-2w container" style={{ width: 282 }}>
      {children}
    </div>
  )
}

export const HomeTiles = ({ tiles }) => {
  return (
    <div className="fr-grid-row">
      {tiles.map((tile: TTile, index: number) => {
        return (
          <TileContainer key={index}>
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
