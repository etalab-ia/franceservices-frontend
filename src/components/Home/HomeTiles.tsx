import type { Tile as TTile } from '@types'
import { MFSressourcesTiles } from '@constants/inputFields'

const TileContainer = ({ children }) => {
  return (
    <div className="fr-mr-2w container" style={{ width: 282 }}>
      {children}
    </div>
  )
}

export const HomeTiles = () => {
  return (
    <div className="fr-grid-row">
      {MFSressourcesTiles.map((tile: TTile, index: number) => {
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

function Tile({ className, desc, enlargeLink, linkProps, imageUrl, title }) {
  return (
    <div
      className="fr-tile fr-tile--horizontal fr-tile--vertical@md fr-enlarge-link"
      id="tile-6664"
    >
      <div className="fr-tile__body">
        <div className="fr-tile__content">
          <h3 className="fr-tile__title">
            <a href={linkProps.href}>{title}</a>
          </h3>
        </div>
      </div>
      <div className="fr-tile__header">
        <div className="fr-tile__pictogram">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    </div>
  )
}
