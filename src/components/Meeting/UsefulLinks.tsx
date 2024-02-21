import { Tile } from '@codegouvfr/react-dsfr/Tile'
import { Tile as TileType, WebService } from 'types'

/*
 * Tiles containing useful links for the meeting's response
 */
export const UsefulLinks = ({
  webservices,
  extraClass,
}: { webservices: WebService[]; extraClass?: string }) => {
  const tiles =
    !webservices || !webservices.length ? [] : setUsefulLinksTilesProps(webservices)

  return (
    <div className={`${extraClass} h-full`}>
      <h3 className={'text-2xl font-bold fr-pb-3w '}>Liens pratiques</h3>

      {tiles.map((tile, key) => {
        return (
          <div className="fr-mb-2w" key={key}>
            <SmallHorizontalTile tileProps={tile} />{' '}
          </div>
          /*                     <Tile
            key={key}
            horizontal
            className="fr-mb-3v"
            desc={tile.desc}
            linkProps={tile.linkProps}
            title={tile.title}
          /> */
        )
      })}
    </div>
  )
}

function SmallHorizontalTile({ tileProps }: { tileProps: TileType }) {
  return (
    /*     <a href={tileProps.linkProps.href}>
     */ <div
      className="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link  hover:bg-[#f6f6f6]"
      id="tile-6661"
    >
      <div className="fr-tile__body">
        <div className="fr-tile__content">
          <h3 className="fr-tile__title">
            <a
              href={tileProps.linkProps.href}
              style={{ backgroundImage: 'none', textDecoration: 'none' }}
            >
              {tileProps.title}
            </a>
          </h3>
          <p className="fr-tile__detail">{tileProps.desc.key}</p>
          <div className="fr-tile__start"></div>
        </div>
      </div>
    </div>
    /*     </a>
     */
  )
}

/**
 * Helper function to generate tiles props from webservices
 */
export const setUsefulLinksTilesProps = (webservices: WebService[]) => {
  const tiles: TileType[] = []
  webservices.map((webservice) => {
    const url = webservice.url
    const parsedUrl = new URL(url)
    let domain = parsedUrl.hostname

    domain = domain.replace(/^www\./, '')
    domain = domain.replace(/^entreprendre\./, '')

    const newTile = {
      linkProps: { href: webservice.url },
      title: (
        <>
          <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
            {webservice.type}
          </p>
          <p>{webservice.institution}</p>
        </>
      ),
      desc: <>{domain}</>,
    }
    tiles.push(newTile)
  })
  return tiles
}
